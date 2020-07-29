import reducer from './reducers'
import * as types from './actionTypes'

describe('starwars reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        characters: [],
        films: [],
      },
    );
  })

  it('should handle FETCH_CHARCTERS', () => {
    expect(
      reducer([], {
        type: types.FETCH_CHARCTERS,
      })
    ).toEqual([
      {
        characters: [],
        films: [],
      }
    ])

   
  })
})
