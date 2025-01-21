import { useTheme } from "../context/themeContext";

function Theme() {
  const { themeMode, darkTheme, lightTheme } = useTheme();

  const ThemeChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;

    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <div className="flex items-center">
      <label className="font-bold mr-2">{themeMode === "dark" ? "Light Mode" : "Dark Mode"}</label>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={ThemeChangeBtn}
          checked={themeMode === "dark"}
        />
        <div className="w-14 h-8 bg-gray-200 rounded-full peer-checked:bg-gray-800 peer-checked:border-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 transition-colors duration-300">
          <div
            className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
              themeMode === "dark" ? "translate-x-6" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
}

export default Theme;
