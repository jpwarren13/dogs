import { TOGGLE_DOG, ADD_DOG, REMOVE_DOG, FILTER_DOGS, EDIT_DOG, SORT_DOGS, RENDERED} from "../actionTypes";
import dogs from "../data/dogs";

const initialState = {
  dogs: dogs.map((dog, i) => ({...dog, index: i, selected: false}))
};
function sortAscending  (a, b) {
    if(a > b){
        return 1;
    } if(a < b){
        return -1;
    } else{
        return 0;
    }
}

function sortDescending (a, b){
    if(a>b){
        return -1;
    }
    if(a > b){
        return 1;
    }
    else {return 0;}
}

let ascending = false;
export default function(state = initialState, action) {

    console.log("REDUCERS", state)

  switch (action.type) {
    case RENDERED: {
        return{
            state
        }
    }
    case ADD_DOG: {
      const { dog } = action.payload;
      const stateDogs = [...state.dogs];
      const sortedDogs = stateDogs.sort((a,b) => {
          const {index: indexA} = a;
          const {index: indexB} = b;

          if(indexA<indexB){
              return -1;
          } if(indexA>indexB){
              return 1
          }
          return 0
      })

      return {
        ...state,
        dogs: [...stateDogs, {...dog, index: sortedDogs[sortedDogs.length-1].index + 1, selected: false}]
      };
    }
    case REMOVE_DOG: {
        const stateDogs = [...state.dogs];
  
        return {
          ...state,
          dogs: stateDogs.filter(({selected}) => !selected)
        };
      }
    case EDIT_DOG: {
        const {newDogs} = action.payload;
  
        return {
            ...state,
            dogs: [...newDogs]
        }
    }
    case TOGGLE_DOG: {
      const { id } = action.payload;
      return {
        ...state,
        dogs: state.dogs.map((dog) => {
            
            if(id === dog.index){
                return {...dog, selected: !dog.selected}
            }
            return dog;
        })
      };
    }
    case FILTER_DOGS: {
        const { filterString, key } = action.payload;
        return {
          ...state,
          dogs: state.dogs.filter((dog) => {
              return dog[key].includes(filterString)
          })
        };
      }
      case SORT_DOGS: {
        const { key } = action.payload;
        ascending = !ascending;
        const newSortedDogs = ascending ? [...state.dogs].sort((a, b) => sortAscending(a[key], b[key])) : [...state.dogs].sort((a,b) => sortDescending(a[key], b[key]))
        return {
          ...state,
          dogs: newSortedDogs
        };
      }
    default:
      return state;
  }
}
