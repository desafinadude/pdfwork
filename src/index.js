import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/umd/entry.webpack';
import ReactDOM from "react-dom";

// import './Sample.less';

export default class Sample extends Component {
  state = {
    file: './test.pdf',
    numPages: null,
    pagesRendered: null,
  }

  onDocumentLoadSuccess = ({ numPages }) =>
    this.setState({
      numPages,
      pagesRendered: 0,
    });

  onRenderSuccess = () =>
    this.setState(prevState => ({
      pagesRendered: prevState.pagesRendered + 1,
    }));

  render() {
    const { file, numPages, pagesRendered } = this.state;

    /**
     * The amount of pages we want to render now. Always 1 more than already rendered,
     * no more than total amount of pages in the document.
     */
    const pagesRenderedPlusOne = Math.min(pagesRendered + 1, numPages);

    return (
      <div className="Example">
        <div className="Example__container">
          <div className="Example__container__document">
            <Document
              file={file}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              {
                Array.from(
                  new Array(pagesRenderedPlusOne),
                  (el, index) => {
                    const isCurrentlyRendering = pagesRenderedPlusOne === index + 1;
                    const isLastPage = numPages === index + 1;
                    const needsCallbackToRenderNextPage = isCurrentlyRendering && !isLastPage;

                    return (
                      <Page
                        key={`page_${index + 1}`}
                        onRenderSuccess={
                          needsCallbackToRenderNextPage ? this.onRenderSuccess : null
                        }
                        pageNumber={index + 1}
                      />
                    );
                  },
                )
              }
            </Document>
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Sample />, document.getElementById("index"));
