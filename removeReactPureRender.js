/**
 * Transform all named exports to a default one, at the end of the file
 * Transforms:
 * export const myFunc = () => {};
 *
 * into:
 * const myFunc = () => {};
 *
 * export default {
 *  myFunc,
 * };
 */

module.exports = function(file, api) {
  const j = api.jscodeshift;

  const root = j(file.source);

  const importDeclaration = root.find(j.ImportDeclaration, {
    source: {
      value: 'react-pure-render',
    },
  });
  if (importDeclaration) {
    importDeclaration.remove();

    // Remove inheritance to PureComponent
    root
      .find(j.ClassDeclaration, {
        superClass: {
          name: 'PureComponent',
        },
      })
      .forEach(path => {
        const superClass = path.value.superClass;
        path.value.superClass = j.memberExpression(
          j.identifier('React'),
          j.identifier('Component')
        );
      });

    const decl = root.find(j.ClassProperty, {
      value: {
        name: 'shouldPureComponentUpdate',
      },
    });
    if (decl) decl.remove();
  }

  return root.toSource({
    trailingComma: true,
  });
};
