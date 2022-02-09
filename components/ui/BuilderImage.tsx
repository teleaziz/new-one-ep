import Image, { ImageProps } from 'next/image'

const BuilderImage: React.FC<ImageProps> = (props) => {
  return (
    <Image
      loader={({ src, width, quality }) => {
        return `${src}?width=${width}&quality=${quality || 75}`
      }}
      {...props}
    />
  )
}

export default BuilderImage
