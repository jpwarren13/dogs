import React from 'react';
import DogTable from '../components/table';
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
function Main() {
return (
    <>
    <div css={css`overflow-x: visible;`}>
    <DogTable />
    </div>

    </>
)
}

export default Main;