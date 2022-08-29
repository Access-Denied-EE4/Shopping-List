import { Container } from "react-bootstrap";
import Signup from "./components/Signup";

function App() {
  return (
    <Container className="d-flex align-itmes-center justify-content-center"
                style={{minHeight: "100vh"}}>

      <div className="w-100" style={{maxWidth: '400px'}}>
        <Signup/>
      </div>
    </Container>
  );
}

export default App;
