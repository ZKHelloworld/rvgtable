import React from 'react';
import ReactDOM from 'react-dom';
import RVGTable from './RVGTable';

/**
 * react-virtualized grid table
 */
export default class {
    constructor($dom, options = {}) {
        this.$dom = $dom;
        this.options = options;

        this.table = React.createRef();
    }

    mount() {
        ReactDOM.render(
            <RVGTable ref={this.table} options={this.options} />,
            this.$dom
        );
    }

    updateData(data) {
        if (this.table.current) {
            this.table.current.updateData(data);
        }
    }

    updateOptions(options) {
        if (this.table.current) {
            this.table.current.updateOptions(options);
        }
    }

    updateOption(key, value) {
        if (this.table.current) {
            this.table.current.updateOptions({
                ...this.options,
                [key]: value,
            });
        }
    }

    recomputeGridSize(columnIndex) {
        if (this.table.current) {
            this.table.current.head.current.recomputeGridSize(columnIndex);
            this.table.current.grid.current.recomputeGridSize(columnIndex);
        }
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.$dom);
    }
}
