import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Menu from "./menu";
import { Table, Checkbox, Input, Icon, Button } from "semantic-ui-react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { setFilter } from "../redux/actions";

const headerClass = css`
  :hover {
    filter: brightness(0.5);
  }
`;

const sortOrder = {name: 1, breed: 2, owner: 3, size: 4, description: 5, default: 1000}
const DogTable = ({ dogs, sort, toggleSelect }) => {
  const exRegex = /index|selected/;
  const exclusions = ["index", "selected"];
  const [tableDogs, setTableDogs] = useState([...dogs]);

  useEffect(() => {
    setTableDogs(dogs);
  }, [dogs]);
  return (
    <React.Fragment>
      <Menu setTableDogs={setTableDogs}/>
      <Table celled>
        <Table.Header>
          <Table.Row>
            {(tableDogs && tableDogs.length && (
              <Table.HeaderCell css={css}>Select</Table.HeaderCell>
            )) ||
              null}
            {(Array.isArray(tableDogs) &&
              tableDogs.length &&
              Object.keys(tableDogs[0]).sort()
                .filter((key) => !exRegex.test(key))
                .map((key, i) => (
                  <Table.HeaderCell key={i} css={css}>
                    <div
                      css={css`
                        display: flex;
                        align-content: space-between;
                        flex-direction: column;
                      `}
                    >
                      <div>
                        {key}

                        <Icon
                          name="sort"
                          onClick={() => {
                            sort(key);
                          }}
                        />
                      </div>
                      <Input
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            const filt = [...dogs].filter((d) => {
                              const reg = new RegExp(e.target.value, 'i');
                              return reg.test(d[key]);
                            });
                            if (filt.length) {
                              setTableDogs(filt);
                            } else {
                              setTableDogs([]);
                            }
                          }
                        }}
                      />
                    </div>
                  </Table.HeaderCell>
                ))) ||
              null}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Array.isArray(tableDogs) &&
            tableDogs.map((dog, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell>
                    <Checkbox
                      checked={dog?.selected}
                      onChange={() => {
                        const index = dog && dog.index;
                        toggleSelect(index);
                      }}
                    />
                  </Table.Cell>
                  {Object.entries(dog).sort()
                    .filter(([key, val]) => !exRegex.test(key))
                    .map(([key, d], i) => (
                      <Table.Cell key={i}>{d}</Table.Cell>
                    ))}
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      {
        <>
          <Button onClick={() => setTableDogs([...dogs])}> Reset </Button>
        </>
      }
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    dogs: state.dogs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sort: (key) => dispatch({ type: "SORT_DOGS", payload: { key } }),
    toggleSelect: (id) => dispatch({ type: "TOGGLE_DOG", payload: { id } }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DogTable);
