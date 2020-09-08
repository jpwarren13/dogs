import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Menu } from "semantic-ui-react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";


function ModalExampleModal({
  open,
  title,
  onClose,
  onOpen,
  triggerElement,
  addDog,
  editDog,
  onEditDogs,
  dogs,
  onAddDog,
}) {
  const [dogEntries, setDogEntries] = useState(
    Object.keys(dogs[0])
      .filter((d) => !/index|selected/.test(d))
      .reduce((acc, curr) => {
        acc[curr] = null;
        return acc;
      }, {})
  );
  const [editDogs, setEditDogs] = useState(
    Object.entries(dogs)
      .filter(([key, val]) => !/index|selected/.test(key))
      .reduce((acc, [key, val]) => {
        acc[key] = val;
        return acc;
      }, {})
  );
  const [allDogs, setAllDogs] = useState([...dogs]);
  const [currentDog, setCurrentDog] = useState(
    [...dogs].findIndex(({ selected }) => selected)
  );

  useEffect(() => {
   setAllDogs([...dogs]);
   setCurrentDog( [...dogs].findIndex(({ selected }) => selected))
  }, [dogs])
  return (
    <>
      <Modal
        onClose={onClose}
        onOpen={onOpen}
        open={open}
        trigger={triggerElement}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <Modal.Description></Modal.Description>
          {editDog ? (
            <>
            <Menu>
              {allDogs
                .filter((d) => d.selected)
                .map(({ name, index }) => (
                  <Menu.Item
                    name={name}
                    active={currentDog === index}
                    onClick={() => {
                      setCurrentDog(index);
                    }}
                  >
                    {name}
                  </Menu.Item>
                ))}
            </Menu>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
              `}
            >
              {Object.entries(allDogs[currentDog]).map(([entry, value], i) => {
                // const editAtIndex = allDogs.findIndex(({index}) => currentDog.index === index);
                const dogToEdit = { ...allDogs[currentDog] };
                return entry !== "selected" && entry !== "index" ? (
                  <React.Fragment>
                    {entry}:
                    <Input
                      key={`${entry}-${i}`}
                      placeholder={entry}
                      value={value}
                      onChange={(e) => {
                        dogToEdit[entry] = e.target.value;
                        const newDogArray = [...allDogs];
                        newDogArray[currentDog] = dogToEdit;
                        setAllDogs(newDogArray);
                      }}
                      css={css`
                        margin-bottom: 1rem;
                      `}
                    />
                  </React.Fragment>
                ) : null;
              })}{" "}
            </div>
          </>
          ) : addDog ? (
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
              `}
            >
              {Object.keys(dogEntries).map((entry, i) => (
                <React.Fragment>
                  {entry}:
                  <Input
                    placeholder={entry}
                    onChange={(e) => {
                      const newDogs = { ...dogEntries };
                      newDogs[entry] = e.target.value;
                      setDogEntries(newDogs);
                    }}
                    css={css`
                      margin-bottom: 1rem;
                    `}
                  />
                </React.Fragment>
              ))}
            </div>
          ) : null}
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="black"
            onClick={() => {
              onClose();
              setAllDogs([...dogs]);
            }}
          >
            Cancel
          </Button>
          <Button
            content="Accept"
            labelPosition="right"
            icon="checkmark"
            onClick={
              addDog
                ? () => {
                    onAddDog(dogEntries);
                    onClose();
                  }
                : () => {
                    onEditDogs([...allDogs]);
                    onClose();
                  }
            }
            positive
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ModalExampleModal;
