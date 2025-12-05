import { ColorPickerProvider } from '@gilak/color-picker'
import { Editor } from '../Editor'

export const App: React.FC = () => {
  return (
    <ColorPickerProvider radius={5} size={15} width={20}>
      <Editor />
    </ColorPickerProvider>
  )
}
