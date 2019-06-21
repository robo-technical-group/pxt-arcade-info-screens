# MakeCode Arcade Info Screens API

See [README.md](README.md) for some code examples.

## Interfaces

- [`CursorOptions`](CursorOptions.md)
- [`MovingSpriteOptions`](MovingSpriteOptions.md)
- [`StringPrintOptions`](StringPrintOptions.md)
- [`StringArrayPrintOptions`](StringArrayPrintOptions.md)
- [`String2dArrayPrintOptions`](String2dArrayPrintOptions.md)

## Enumerations

- [`FooterLocation`](FooterLocation.md)
- [`SpriteDirection`](SpriteDirection.md)
- [`SpriteMode`](SpriteMode.md)
- [`SpriteType`](SpriteType.md)

## `RotatingScreens` class

- [`constructor(string[], number?, string?[][], number?, string?, number?, string?[][], number?, number?, number?)`](RotatingScreens.constructor.md)
- **Properties**
  - [`backImage`](RotatingScreens.backImage.md)
  - [`canvas`](RotatingScreens.canvas.md)
  - [`delay`](RotatingScreens.delay.md)
  - [`footer`](RotatingScreens.footer.md)
  - [`headlines`](RotatingScreens.headlines.md)
  - [`midText`](RotatingScreens.midText.md)
  - [`movingSpriteOptions`](RotatingScreens.movingSpriteOptions.md)
  - [`nextTime`](RotatingScreens.nextTime.md)
  - [`sequentialSprites`](RotatingScreens.sequentialSprites.md)
  - [`titles`](RotatingScreens.titles.md)
- **Public methods**
  - [`addHeadlines(string[])`](RotatingScreens.addHeadlines.md)
  - [`addMovingSprite(Image)`](RotatingScreens.addMovingSprite.md)
  - [`addMidText(string[])`](RotatingScreens.addMidText.md)
  - [`addStaticSprite(StaticSpriteOptions)`](RotatingScreens.addStaticSprite.md)
  - [`build`](RotatingScreens.build.md)
  - [`clearMovingSprites`](RotatingScreens.clearMovingSprites)
  - [`destroySprites`](RotatingScreens.destroySprites.md)
  - [`rebuild`](RotatingScreens.rebuild.md)
  - [`release`](RotatingScreens.release.md)
  - [`refresh`](RotatingScreens.refresh.md)
  - [`rotate`](RotatingScreens.rotate.md)
  - [`setTitles`](RotatingScreens.setTitles.md)
  - [`showScrollingSprite`](RotatingScreens.showScrollingSprite.md)

## `OptionScreen` class

Inherits from `RotatingScreens`.

- [`constructor(string[], number?, string?[][], number?, string?[][], number?, boolean?, number?, number?)`](OptionScreen.constructor.md)
- **Properties**
  - [`cursor`](OptionScreen.cursor.md)
  - [`done`](OptionScreen.done.md)
  - [`doneText`](OptionScreen.doneText.md)
  - [`options`](OptionScreen.options.md)
  - [`selections`](OptionScreen.selections.md)
  - [`showNext`](OptionScreen.showNext.md)
  - [`showPrevious`](OptionScreen.showPrevious.md) 
- **Public methods**
  - [`addOption(string[])`](OptionScreen.addOption.md)
  - [`getSelection(number?)`](OptionScreen.getSelection.md)
  - [`moveCursorDown`](OptionScreen.moveCursorDown.md)
  - [`moveCursorLeft`](OptionScreen.moveCursorLeft.md)
  - [`moveCursorRight`](OptionScreen.moveCursorRight.md)
  - [`moveCursorUp`](OptionScreen.moveCursorUp.md)
  - [`select`](OptionScreen.select.md)
  - [`setSelection(number?, number?)`](OptionScreen.setSelection.md)

## `OptionScreenCollection` class

Inherits from `OptionScreen`.

- [`constructor(string[], number?, string?[][], number?, number?, number?)`](OptionScreenCollection.constructor.md)
- **Properties**
  - [`currScreen`](OptionScreenCollection.currScreen.md)
  - [`selections`](OptionScreenCollection.selections.md)
  - [`selectionsAllScrens`](OptionScreenCollection.selectionsAllScreens.md)
  - [`tabs`](OptionScreenCollection.tabs.md)
- **Public methods**
  - [`addScreen(string, string[][], boolean)`](OptionScreenCollection.addScreen.md)
  - [`getSelection(number?)`](OptionScreenCollection.getSelection.md)
  - [`setSelection(number?, number?)`](OptionScreenCollection.setSelection.md)
  - [`setSelectionForScreen(number, number? number?)`](OptionScreenCollection.setSelectionsForScreen.md)

## `SplashScreens` class

Inherits from `RotatingScreens`.

- [`constructor(string[], number?, string?[][], number?, string?, number?, string?[][], number?, number?, number?)`](SplashScreens.constructor.md)
- **Properties**
  - [`instructions`](SplashScreens.instructions.md)
- **Public methods**
  - [`addInstructionsList`](SplashScreens.addInstructionsList.md)
