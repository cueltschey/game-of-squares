import SplitPane, {Pane} from "react-split-pane"
import "./Main.css"

const Main = () => {
  return (
    <SplitPane split="vertical" >
      <Pane minSize="10%" >You can use a Pane component</Pane>
      <Pane minSize="10%" >
        Using a Pane allows you to specify any constraints directly
      </Pane>
    </SplitPane>
  )
}

export default Main
