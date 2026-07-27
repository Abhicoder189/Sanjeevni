import ChatBox from "../components/ChatBox";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <ChatBox />
    </div>
  );
}