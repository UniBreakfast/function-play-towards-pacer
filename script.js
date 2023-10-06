main()

async function main() {
  await showMainMenu()
}

async function showMainMenu() {
  const mainMenuTemplate = await createTemplate('top-center', 'center-top', 'center')
  const screen = await createScreen(mainMenuTemplate)
  const confidenceDisplay = await createConfidenceDisplay()
  const mainMenuTitle = await createMainMenuTitle()
  const mainMenu = await createMainMenu()
  const menuScreenParts = await prepareParts(
    'top-center', confidenceDisplay,
    'center-top', mainMenuTitle,
    'center', mainMenu,
  )
  const menuScreen = await assembleScreen(screen, menuScreenParts)
  
  await showScreen(menuScreen)
}

async function createTemplate(...slotPositions) {
  const template = slotPositions

  return template
}

async function createScreen(template) {
  const main = await createElement('main', 'screen')
  const slots = await map(template, position => createElement('div', position))
  const screen = await append(main, ...slots)
  
  return screen
}

async function createElement(tag, className) {
  const element = document.createElement(tag)
  
  if (!className) return element

  element.classList.add(className)

  if (className == 'screen') await applyScreenStyle(element)
  if (className == 'top-center') await applyTopCenterStyle(element)
  if (className == 'center-top') await applyCenterTopStyle(element)
  if (className == 'center') await applyCenterStyle(element)

  return element
}

async function applyScreenStyle(element) {
  element.style.width = 'calc(100vw - 2rem)'
  element.style.height = 'calc(100vh - 2rem)'
}

async function applyTopCenterStyle(element) {
  element.style.position = 'absolute'
  element.style.top = '1rem'
  element.style.left = '50%'
  element.style.transform = 'translateX(-50%)'
}
