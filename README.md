## What is RVGTable

This is a framework-independent table library that wrapped on top of [react-virtualized grid](https://github.com/bvaughn/react-virtualized/blob/master/docs/Grid.md).

Rely on **vertical** and **horizontal** virtual scrolling feature of react-virtualized grid, this table can render large data efficiently.

## How to use

1. `npm install & npm run build`
2. copy `dist/RVGTable.js` to your static folder and load: `<script type="text/javascript" src="./RVGTable.js"></script>`
3. ```
   const RVGTable = window.RVGTable.default;
   const $dom = document.querySelector('#table');

   let table = new RVGTable($dom, {
       columnWidth: 100,
       rowHeight: 30,
   });
   table.mount();

   table.updateData(data); // data: [[1, 2, 3], [4, 5, 6]]
   ```

## API

```
const instance = new RVGTable(
  $el, // dom element
  options // Options
);
```

### Instance Methods

#### mount()

Mount the table DOM to the `$el`.

#### updateData(data: Array<Array<String>>)

Update table instance's data.

```
const data = [
  ['1:1', '1:2', '1:3'],
  ['2:1', '2:2', '2:3'],
  ['3:1', '3:2', '3:3'],
]
instance.updateData(data);
```

#### updateOptions(options)

Update options.

```
const columns = ['column-1', 'column-2'];
instance.updateOptions({ columns });
```

#### destroy()

Destroy table instance.

### Options

```
{
    columns: Array<String>, // table head config, etc: ['column-1', 'column-2']
    columnWidth: Number | Function, // detail: https://github.com/bvaughn/react-virtualized/blob/master/docs/Grid.md#prop-types
}
```
