import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import './ScrollExpandMedia.css'

// Ported from the Next.js/Tailwind "scroll-expansion-hero" to plain JSX + CSS.
// Scroll (or swipe) grows the centered media until it fills the view, then the
// page releases and the children content fades in below.
export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  centerLogo,
  children,
}) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)
  const [isMobileState, setIsMobileState] = useState(false)
  // Smoothed value that eases toward scrollProgress every frame so the
  // expansion glides even though wheel/touch events arrive in coarse steps.
  const [displayProgress, setDisplayProgress] = useState(0)

  const sectionRef = useRef(null)
  const targetRef = useRef(0)
  const displayRef = useRef(0)
  const rafRef = useRef(0)

  // Easing loop that runs ONLY while displayProgress is catching up to the
  // target, then stops itself — so nothing animates every frame while the hero
  // video is simply playing (idle). This was previously an always-on loop.
  const startEase = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const tick = () => {
      const target = targetRef.current
      const diff = target - displayRef.current
      if (Math.abs(diff) < 0.0006) {
        displayRef.current = target
        setDisplayProgress(target)
        rafRef.current = 0
        return
      }
      displayRef.current += diff * 0.09
      setDisplayProgress(displayRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    setScrollProgress(0)
    setDisplayProgress(0)
    displayRef.current = 0
    targetRef.current = 0
    setShowContent(false)
    setMediaFullyExpanded(false)
  }, [mediaType])

  // On each scroll-target change, wake the easing loop (it stops on its own).
  useEffect(() => {
    targetRef.current = scrollProgress
    startEase()
  }, [scrollProgress, startEase])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  // Respect reduced-motion: present the media already expanded, no scroll hijack.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setScrollProgress(1)
      setDisplayProgress(1)
      displayRef.current = 1
      targetRef.current = 1
      setMediaFullyExpanded(true)
      setShowContent(true)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const scrollDelta = e.deltaY * 0.0006
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1)
        setScrollProgress(newProgress)

        if (newProgress >= 1) {
          setMediaFullyExpanded(true)
          setShowContent(true)
        } else if (newProgress < 0.75) {
          setShowContent(false)
        }
      }
    }

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY)
    }

    const handleTouchMove = (e) => {
      if (!touchStartY) return

      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005
        const scrollDelta = deltaY * scrollFactor
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1)
        setScrollProgress(newProgress)

        if (newProgress >= 1) {
          setMediaFullyExpanded(true)
          setShowContent(true)
        } else if (newProgress < 0.75) {
          setShowContent(false)
        }

        setTouchStartY(touchY)
      }
    }

    const handleTouchEnd = () => {
      setTouchStartY(0)
    }

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [scrollProgress, mediaFullyExpanded, touchStartY])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const p = displayProgress
  const mediaWidth = 300 + p * (isMobileState ? 650 : 1250)
  // grow tall enough that the maxHeight clamp always binds, keeping a fixed,
  // symmetric gap above/below the video regardless of viewport height
  const mediaHeight = 400 + p * (isMobileState ? 500 : 900)
  const textTranslateX = p * (isMobileState ? 180 : 150)

  const firstWord = title ? title.split(' ')[0] : ''
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : ''

  return (
    <div ref={sectionRef} className="sem-root">
      <section className="sem-section">
        <div className="sem-stage">
          <motion.div
            className="sem-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - p }}
            transition={{ duration: 0.1 }}
          >
            <img src={bgImageSrc} alt="" className="sem-bg-img" />
            <div className="sem-bg-overlay" />
          </motion.div>

          <div className="sem-container">
            <div className="sem-media-wrap">
              <div
                className="sem-media"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  // leave clearance below the fixed header so the video never tucks under it
                  maxHeight: 'calc(100vh - 160px)',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  <div className="sem-media-inner">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="sem-video"
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <motion.div
                      className="sem-shade"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 0.45 - p * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="sem-media-inner" style={{ pointerEvents: 'auto' }}>
                    <img src={mediaSrc} alt={title || 'Media content'} className="sem-image" />
                    <motion.div
                      className="sem-shade"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - p * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="sem-media-text">
                  {date && (
                    <p className="sem-date" style={{ transform: `translateX(-${textTranslateX}vw)` }}>
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p className="sem-scroll" style={{ transform: `translateX(${textTranslateX}vw)` }}>
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {centerLogo && (
                <div
                  className="sem-logo"
                  style={{
                    transform: `translate(-50%, -50%) scale(${p})`,
                    opacity: Math.min(1, p * 1.15),
                  }}
                >
                  {centerLogo}
                </div>
              )}

              <div
                className="sem-title-wrap"
                style={{ mixBlendMode: textBlend ? 'difference' : 'normal' }}
              >
                <motion.h2 className="sem-title" style={{ transform: `translateX(-${textTranslateX}vw)` }}>
                  {firstWord}
                </motion.h2>
                <motion.h2 className="sem-title" style={{ transform: `translateX(${textTranslateX}vw)` }}>
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className="sem-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  )
}
