import GridLayout from "react-grid-layout";
import { Contents } from "./contents-code";

export class GridContentsLayout {
  contents: Contents;
  item: GridLayout.Layout;

  constructor({
    contents,
    item,
  }: {
    contents: Contents;
    item: GridLayout.Layout;
  }) {
    this.contents = contents;
    this.item = item;
  }
}
