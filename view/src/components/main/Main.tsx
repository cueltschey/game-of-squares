import SplitPane, {Pane} from "react-split-pane"
import "./Main.css"
import Squares from "./Squares.tsx"
import Edit from "./Edit.tsx"

const Main = () => {
  const [selected, setSelected] = useState(0);
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data'); // Assuming your local endpoint is '/api/data'
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setSquares(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <SplitPane split="vertical" defaultSize="50%">
      <Pane >
        <Squares squares={squares} setSelected={(index : number) => setSelected(index)} selected={selected} />
      </Pane>
      <Pane >
        <Edit />
      </Pane>
    </SplitPane>
  )
}

export default Main
