/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'

export const JSONProps: any = (props: any) => {
  return (
    <div>
        {JSON.stringify(props)}
    </div>
  )
}
