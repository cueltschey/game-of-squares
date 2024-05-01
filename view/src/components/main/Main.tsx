import SplitPane, {Pane} from "react-split-pane"
import "./Main.css"
import Squares from "./Squares.tsx"
import Edit from "./Edit.tsx"

const Main = () => {
  return (
    <SplitPane split="vertical" defaultSize="50%">
      <Pane >
        <Squares />
      </Pane>
      <Pane >
        <Edit />
      </Pane>
    </SplitPane>
  )
}

export default Main
