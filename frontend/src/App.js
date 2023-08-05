import { Outlet } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

function App() {
  socket.emit("send_message", { message: "this is from frontend message !!" });
  return <Outlet />;
}

export default App;
