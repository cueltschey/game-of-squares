import SplitPane, {Pane} from "react-split-pane"
import "./Main.css"

const Main = () => {
  return (
    <SplitPane split="vertical" defaultSize="50%">
      <Pane >
        Using a Pane allows you to specify any constraints directly
      </Pane>
      <Pane >
        Using a Pane allows you to specify any constraints directly
      </Pane>
    </SplitPane>
  )
}

export default Main
