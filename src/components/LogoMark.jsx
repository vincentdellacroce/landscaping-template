// The real Your Company emblem (cropped from the official logo to a transparent PNG).
export default function LogoMark({ size = 40 }) {
  return (
    <img
      src="/logo-mark.png"
      alt=""
      className="mark"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  )
}
