import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 91.47 122.88"
      enableBackground="new 0 0 91.47 122.88"
      {...props}
    >
      <Path
        d="M2.94 0h88.53v91.82H0V0h2.94zm62.78 108.73h-5.65v-1.97c0-1.24-.05-2.02-.16-2.33-.11-.32-.36-.47-.75-.47-.34 0-.57.13-.7.4-.12.27-.18.96-.18 2.06v10.41c0 .97.06 1.61.18 1.92.13.31.37.46.73.46.4 0 .67-.17.82-.52.14-.35.21-1.03.21-2.04v-2.57h-1.1v-3.29h6.58v11.63h-3.55l-.52-1.55c-.38.67-.87 1.17-1.45 1.51-.58.34-1.28.51-2.07.51-.95 0-1.83-.23-2.66-.69-.82-.46-1.45-1.03-1.88-1.71a5.44 5.44 0 01-.8-2.13c-.1-.75-.16-1.87-.16-3.36v-6.45c0-2.07.11-3.58.33-4.51.22-.94.87-1.8 1.92-2.58 1.06-.78 2.42-1.17 4.1-1.17 1.65 0 3.02.34 4.11 1.02 1.09.68 1.8 1.49 2.13 2.42.33.94.49 2.29.49 4.07v.93h.03zm-24.32-8.01h9.41v4.33h-3.76v4.14h3.51v4.11h-3.51v4.77h4.14v4.33H41.4v-21.68zm-.97 0l-2.86 21.7h-8.54l-3.27-21.7h5.95c.67 5.98 1.16 11.05 1.47 15.18.3-4.18.61-7.9.93-11.14l.37-4.05h5.95v.01zm5.3-80.76c14.33 0 25.95 11.62 25.95 25.95S60.06 71.85 45.73 71.85 19.78 60.23 19.78 45.91c.01-14.33 11.62-25.95 25.95-25.95zM85.59 5.88H5.88v80.06h79.71V5.88z"
        fill="#008300"
      />
    </Svg>
  )
}

export default SvgComponent