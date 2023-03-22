import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { ListOfGoods } from './ListOfGoods';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  visibleGoods.sort((prev, curr) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return prev.localeCompare(curr);
      case SortType.LENGTH:
        return prev.length - curr.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

// DON'T save goods to the state
// type State = {
//   isReversed: boolean,
//   sortType: SortType,
// };

export class App extends React.Component<{}, ReorderOptions> {
  state: ReorderOptions = {
    sortType: SortType.NONE,
    isReversed: false,
  };

  sortByAlphabet = () => {
    this.setState({ sortType: SortType.ALPHABET });
  };

  sortByLength = () => {
    this.setState({ sortType: SortType.LENGTH });
  };

  reverse = () => {
    this.setState((state) => ({
      isReversed: !state.isReversed,
    }));
  };

  reset = () => {
    this.setState({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  render() {
    const { isReversed, sortType } = this.state;
    const reorderedGoods = getReorderedGoods(goodsFromServer, this.state);

    return (
      <>
        <div className="section content">
          <div className="buttons">
            <button
              type="button"
              className={classNames(
                'button is-info',
                { 'is-light': sortType !== SortType.ALPHABET },
              )}
              onClick={this.sortByAlphabet}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className={classNames(
                'button is-success',
                { 'is-light': sortType !== SortType.LENGTH },
              )}
              onClick={this.sortByLength}
            >
              Sort by length
            </button>

            <button
              type="button"
              className={classNames(
                'button is-warning',
                { 'is-light': this.state.isReversed === false },
              )}
              onClick={this.reverse}
            >
              Reverse
            </button>

            {(sortType !== SortType.NONE || isReversed)
              && (
                <button
                  type="button"
                  className="button is-danger is-light"
                  onClick={this.reset}
                >
                  Reset
                </button>
              )}
          </div>

          <ListOfGoods goods={reorderedGoods} />
        </div>
      </>
    );
  }
}
