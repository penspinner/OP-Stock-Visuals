# OP-Stock-Visuals
A visualization tool for analysts to have is a pair viewer that allows them to compare the historical prices of two stocks

## Instructions
1. Make sure you have these installed: 
  * [node.js](https://nodejs.org): depending on your OS, [CentOS](https://nodejs.org/en/download/package-manager/#enterprise-linux-and-fedora), [Ubuntu](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
  * (optional) [git](https://git-scm.com)
2. Two ways:
  * Zip: If you downloaded this as a zip, open up a terminal.
  * Git: If you're using Git, clone this repository into your local machine using the terminal (Mac/Linux) or Gitbash (Windows): `git clone https://github.com/Penspinner/OP-Stock-Visuals.git`
3. Change directory into the folder `cd /path/to/OP-Stock-Visuals`. Replace '/path/to/' with wherever this project is downloaded to.
4. Run `npm i --production` to install the project dependencies.
5. Run `npm start` command to start the automation.
6. Open up a browser and go to `localhost:4000`. You should now see the app.

## Design
* The chart is placed on the left side while the forms and option tools are on the right.
* The forms are tightly put together to avoid space taking up too much space.
* The options consist of a line chart icon, a bar chart icon, a table icon, and a cross icon. They all have functionality and the option chosen will have a green border.

## Functionality
* The forms require you to input the names of ticker 1 and ticker 2.
  * Note: the app will automatically capitalize the letters for you.
* The next inputs are dates in which you want to generate data from. The first input date must be before the second input date.
  * By default, the date inputs should already have a value: first date should be 1 year from today, and second date is today.
  * Warning: if you load 10 years of data, it may lag a little bit since it will load over 7000 data points and lines.
* You can press the `Update Prices` button to immediately generate the data.
  * Ticker 1 prices will be randomly generated between 75 and 100.
  * Ticker 2 prices will be randomly generated between 100 and 150.
* You should see the chart filled with colorful lines and data points.
  * The x-axis is the date corresponding to the ticker price data.

### Chart functionality
* **Mouseover/Hover** a certain data point on the chart to see a tooltip of that data.
  * **Scroll up** on the data point to zoom in.
  * **Scroll down** on the data point to zoom out.
  * **Drag left/right** to pan across the chart.

### Option bar functionality
* **Click** on the icons to change to the chart/table that you want to see.
  * Line chart icon for line chart
    * Ticker 1 will be based on y-axis; Ticker 2 will be based on y2-axis.
  * Bar chart icon for bar chart
    * The bar chart will show the ratio of the first stock to the second stock. (Ticker 1/Ticker 2)
  * Table icon for data table
    * You can scroll the data table to see data for each day.
  * Cross icon to unload all data from the chart and table.

#### A little note: when you generate the data (update prices), the side bar will show some statistics about the stocks.
