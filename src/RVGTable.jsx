import React, { Component } from 'react';
import { Grid } from 'react-virtualized';

import './style.less';

const DEFAULT_COLUMN_WIDTH = 100;
const DEFAULT_ROW_HEIGHT = 30;

export default class RVGTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [[]],
            options: this.props.options || {},
        };

        this.body = React.createRef();
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
                    rowIndex === 0 ? 'rvgt--body-td-head' : ''
                }`}
                key={key}
                style={style}
                tip={value}
            >
                {value}
            </div>
        );
    };

    columnRenderer = () => {
        return <div class="rvgt--head-td"></div>;
    };

    render() {
        const { data = [], options = {} } = this.state;

        return (
            <div className="rvgt--container">
                <div className="rvgt--body" ref={this.body}>
                    <Grid
                        className="rvgt--body-grid"
                        ref={this.grid}
                        cellRenderer={this.cellRenderer}
                        columnCount={data[0].length}
                        height={
                            this.body.current
                                ? this.body.current.clientHeight
                                : 0
                        }
                        rowCount={data.length}
                        width={
                            this.body.current
                                ? this.body.current.clientWidth
                                : 0
                        }
                        columnWidth={DEFAULT_COLUMN_WIDTH}
                        rowHeight={DEFAULT_ROW_HEIGHT}
                        {...options}
                    />
                </div>
            </div>
        );
    }
}
