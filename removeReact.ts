import { Project, SourceFile, ImportDeclaration } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });
const files: SourceFile[] = project.getSourceFiles("src/**/*.tsx");

files.forEach((file: SourceFile) => {
  file.getImportDeclarations().forEach((imp: ImportDeclaration) => {
    if (imp.getModuleSpecifierValue() === "react") {
      const defaultImport = imp.getDefaultImport();

      if (defaultImport && defaultImport.getText() === "React") {
        const namedImports = imp.getNamedImports();

        if (namedImports.length > 0) {
          // Remove only the default import, keep named imports
          // ts-morph has a helper for this:
          imp.removeDefaultImport();
        } else {
          // No named imports, remove the entire import statement
          imp.remove();
        }
      }
    }
  });
});

project.save().then(() => console.log("Unused React default imports removed!"));
