ServiceNow Code
===============

This contains files, scripts and documentation for customizing and maintaining ServiceNow.

Dev Environment Setup
---------------------

This solution was developed using Visual Studio Code.

The npm package manager (https://npmjs.com) and (VS Code extension eg2.vscode-npm-script) is required for building and package maintenance.

Microsoft PowerShell 5.0 or better may be required for development.

Additionally, the following npm packages most likely need to be installed globally:

- eslint
- tslint
- jshint
- typescript

Use the command "npm update" to install required local packages.

Following is an example PowerShell script that will install other recommended Visual Studio Code extensions:

$RecommendedExtensions = @(
        'abusaidm.html-snippets',
        'Angular.ng-template',
        'christian-kohler.npm-intellisense',
        'christian-kohler.path-intellisense',
        'DavidAnson.vscode-markdownlint',
        'dbaeumer.jshint',
        'dbaeumer.vscode-eslint',
        'DotJoshJohnson.xml',
        'ecmel.vscode-html-css',
        'EditorConfig.EditorConfig',
        'eg2.tslint',
        'eg2.vscode-npm-script',
        'esbenp.prettier-vscode',
        'fknop.vscode-npm',
        'formulahendry.auto-close-tag',
        'HookyQR.JSDocTagComplete',
        'johnpapa.Angular2',
        'johnpapa.angular-essentials',
        'johnpapa.winteriscoming',
        'lolkush.quickstart',
        'Mikael.angular-beastcode',
        'mkaufman.HTMLHint',
        'ms-vscode.powershell',
        'natewallace.angular2-inline',
        'sidthesloth.html5-boilerplate',
        'xabikos.JavaScriptSnippets',
        'Zignd.html-css-class-completion'
)
$InstalledExtensions = (code --list-extensions) -split '\r\n?|\n';
$RecommendedExtensions | ForEach-Object {
    if ($InstalledExtensions -contains $_) {
        "$_ is already installed." | Write-Host;
    } else {
        code --install-extension $_;
    }
}