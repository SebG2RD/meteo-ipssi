/**
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   onSubmit: (event: import("react").FormEvent<HTMLFormElement>) => void
 * }} props
 */
function NativeCityForm({ value, onChange, onSubmit }) {
  return (
    <form className="native-add-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="native-add-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ajouter une ville à l'affichage natif"
      />
      <button type="submit" className="native-add-button">
        Ajouter
      </button>
    </form>
  );
}

export default NativeCityForm;
