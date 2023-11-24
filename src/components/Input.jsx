import "./styles/Input.css";

export default function Input({ handle, input, setInput }) {
  return (
    <div className="input">
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="button" onClick={() => handle(input)}>
        Validez votre réponse
      </button>
    </div>
  );
}
