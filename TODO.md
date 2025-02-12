# TODO List

## Features

- [ ] Main page
- [ ] Add Google Analytics
- [ ] Info page for users. Should prompt first time seeing site /info
- [x] Overall section: for new users, use the average person as the standard
- [ ] suggest next meal
- [x] - Sign for new entries
- [ ] but a different way to add entire meals. perhaps a modal
- [ ] image generation based off meal

## Enhancements

- [ ] Maintain a "grabbing" cursor when dragging widget across grid
- [ ] Currently, when moving a widget with > 1 row, you can only move the widget to the top of two empty spaces.

## Bugs

- [ ]
- [ ]

## Low Priority

- [ ]
- [ ]

## Solved Errors

- OpenAI API Response Parsing Issue
  I asked for a response like {calorie: #, protein: #}, and in return I'd get back "{calorie: 1500, protein: 80}" -> which is invalid JSON, as numbers should not have spaces after the colons. Resulted in errors that could not be solved with JSON.parse()
