import React, { Component } from 'react';
import { Grid, ScrollSync } from 'react-virtualized';

import './style.less';

const HEAD_HEIGHT = 30; // height of table head row
const DEFAULT_COLUMN_WIDTH = 100; // width of each column
const DEFAULT_ROW_HEIGHT = 30; // height of table body row

export default class RVGTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [[]],
            options: this.props.options || {
                columns: [],
            },
            correntRowIndex: -1,
        };

        this.container = React.createRef();
        this.grid = React.createRef();
    }

    updateData(data = []) {
        this.setState({
            data,
        });

        if (this.grid.current) {
            this.grid.current.forceUpdate();
        }
    }

    updateOptions(options = {}) {
        this.setState({
            options,
        });

        if (this.grid.current) {
            this.grid.current.forceUpdate();
        }
    }

    cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
        const value = this.state.data[rowIndex][columnIndex];

        return (
            <div
                className={`rvgt--body-td ${
                    this.state.currentRowIndex === rowIndex
                        ? 'rvgt--body-td_active'
                        : ''
                }`}
                key={key}
                style={style}
                title={value}
                onMouseEnter={() => this.onMouseEnter(rowIndex)}
            >
                {value}
            </div>
        );
    };

    columnRenderer = ({ columnIndex, key, style }) => {
        const value = this.state.options.columns[columnIndex];
        return (
            <div className="rvgt--head-td" key={key} style={style} onClick={e => this.onColumnClick(e, columnIndex)}>
                {value}
            </div>
        );
    };

    onMouseEnter = (rowIndex) => {
      this.setState({
        currentRowIndex: rowIndex
      });

      if (this.grid.current) {
        this.grid.current.forceUpdate();
      }
    };

    onMouseLeave = () => {
      this.setState({
        currentRowIndex: -1
      });

      if (this.grid.current) {
        this.grid.current.forceUpdate();
      }
    };

    onColumnClick = (event, columnIndex) => {
      const options = this.state.options || {};
      event.persist()

      const value = options.columns[columnIndex];
      const param = {
        index: columnIndex,
        value
      };

      if (event.type === 'click') {
        const { onColumnClick = () => {} } = options;
        onColumnClick(event.nativeEvent, param);
      } else if (event.type === 'contextmenu') {
        event.preventDefault();

        const { onColumnRightClick = () => {} } = options;
        onColumnRightClick(event.nativeEvent, param);
      }
    };

    render() {
        const { data = [], options = {} } = this.state;
        const { columns = [], emptyText = 'No Data', ...restOptions } = options;

        const width = this.container.current
            ? this.container.current.clientWidth
            : 0;
        const columnWidth = restOptions.columnWidth || DEFAULT_COLUMN_WIDTH;

        return (
            <div className="rvgt--container" ref={this.container} onMouseLeave={this.onMouseLeave}>
                <ScrollSync>
                    {({ onScroll, scrollLeft }) => (
                        <>
                            <Grid
                                className="rvgt--head"
                                cellRenderer={this.columnRenderer}
                                width={width}
                                height={HEAD_HEIGHT}
                                rowCount={1}
                                rowHeight={HEAD_HEIGHT}
                                columnCount={columns.length}
                                columnWidth={columnWidth}
                                scrollLeft={scrollLeft}
                                onScroll={onScroll}
                            ></Grid>

                            {
                              (!data || !data.length || !data[0] || !data[0].length) ?
                              <div className="rvgt--empty">{ emptyText }</div>
                              :
                              <Grid
                                  className="rvgt--body"
                                  ref={this.grid}
                                  cellRenderer={this.cellRenderer}
                                  width={width}
                                  height={
                                      this.container.current
                                          ? this.container.current.clientHeight
                                          : 0
                                  }
                                  rowCount={data.length}
                                  rowHeight={DEFAULT_ROW_HEIGHT}
                                  columnCount={data[0].length}
                                  columnWidth={columnWidth}
                                  {...restOptions}
                                  onScroll={onScroll}
                              ></Grid>
                            }
                        </>
                    )}
                </ScrollSync>
            </div>
        );
    }
}
