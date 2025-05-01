import QueryWrapper from "./QueryWrapper";
import ReduxWrapper from "./ReduxWrapper";
import RouteWrapper from "./RouteWrapper";
import ThemeWrapper from "./ThemeWrapper";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

function App() {
  return (
    <div>
      <ReduxWrapper>
        <QueryWrapper>
          <ThemeWrapper>
            <RouteWrapper />
          </ThemeWrapper>
        </QueryWrapper>
      </ReduxWrapper>
    </div>
  );
}

export default App;
