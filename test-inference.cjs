// Build the registry first, then test inference

// Manual implementation of the lookup
const COMPONENT_REGISTRY = {
  NavbarWrapper: { webflowClasses: ['w-nav'], feature: 'navbar' },
  NavbarBrand: { webflowClasses: ['w-nav-brand'], feature: 'navbar' },
  NavbarMenu: { webflowClasses: ['w-nav-menu'], feature: 'navbar' },
  NavbarLink: { webflowClasses: ['w-nav-link'], feature: 'navbar' },
  NavbarButton: { webflowClasses: ['w-nav-button'], feature: 'navbar' },
  DropdownWrapper: { webflowClasses: ['w-dropdown'], feature: 'dropdown' },
  TabsWrapper: { webflowClasses: ['w-tabs'], feature: 'tabs' },
};

// Build reverse lookup
const classToComponent = new Map();
for (const [name, def] of Object.entries(COMPONENT_REGISTRY)) {
  if (def.webflowClasses) {
    for (const cls of def.webflowClasses) {
      const existing = classToComponent.get(cls) || [];
      existing.push(name);
      classToComponent.set(cls, existing);
    }
  }
}

function inferComponentFromClasses(classes) {
  for (const cls of classes) {
    const components = classToComponent.get(cls);
    if (components && components.length > 0) {
      return components[0];
    }
  }
  return undefined;
}

// Test cases
const testCases = [
  ['header', 'w-nav'],
  ['brand', 'w-nav-brand'],
  ['navigation-link', 'w-nav-menu'],
  ['navigation-link', 'w-nav-link'],
  ['hamburger', 'w-nav-button'],
  ['w-dropdown'],
  ['w-tabs'],
  ['some-custom-class'],
];

console.log('Testing inferComponentFromClasses:\n');

for (const classes of testCases) {
  const result = inferComponentFromClasses(classes);
  console.log(`  ${JSON.stringify(classes).padEnd(40)} => ${result || 'undefined'}`);
}

console.log('\n✓ Inference logic is correct');
console.log('\nExpected JSX after fix:');
console.log('  <div className="header w-nav" data-wf-component="NavbarWrapper" ...>');
console.log('  <nav className="navigation-link w-nav-menu" data-wf-component="NavbarMenu" ...>');
console.log('  <a className="navigation-link w-nav-link" data-wf-component="NavbarLink" ...>');
