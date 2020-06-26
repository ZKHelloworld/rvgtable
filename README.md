## What is RVGTable

This is a framework-independent table library that wrapped on top of [react-virtualized grid](https://github.com/bvaughn/react-virtualized/blob/master/docs/Grid.md).

Rely on **vertical** and **horizontal** virtual scrolling feature of react-virtualized grid, this table can render large data efficiently.


## How to use

1. `npm install & npm run build`
2. copy `dist/rvgtable.js` to your static folder and load: `<script type="text/javascript" src="./rvgtable.js"></script>`
3.
```
  this.table = new RVGTable(this.$refs.table);
  this.table.mount();

  this.table.updateData(data); // data: [[1, 2, 3], [4, 5, 6]]
```


## API
