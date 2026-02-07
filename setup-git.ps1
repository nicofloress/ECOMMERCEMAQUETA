# Script para Inicializar Git y Subir el Proyecto

# 1. Crear archivo .gitignore
Write-Output "Creando .gitignore..."
@"
# Dependencies
node_modules/
client/node_modules/

# Build outputs
client/dist/
client/build/
**/bin/
**/obj/

# Firebase credentials (IMPORTANTE: NO SUBIR CREDENCIALES)
firebase-credentials.json
Ecommerce.API/firebase-credentials.json

# Environment files
.env
.env.local

# IDE
.vs/
.vscode/
.idea/
*.suo
*.user

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
"@ | Out-File -FilePath .gitignore -Encoding UTF8

# 2. Inicializar repositorio Git
Write-Output "Inicializando repositorio Git..."
git init

# 3. Agregar todos los archivos
Write-Output "Agregando archivos al staging..."
git add .

# 4. Hacer el primer commit
Write-Output "Creando commit inicial..."
git commit -m "Initial commit: E-commerce template with Firebase"

# 5. Crear repositorio en GitHub (requiere GitHub CLI - gh)
Write-Output ""
Write-Output "=========================================="
Write-Output "SIGUIENTE PASO: Crear repositorio en GitHub"
Write-Output "=========================================="
Write-Output ""
Write-Output "Opción 1 - Con GitHub CLI (si tienes 'gh' instalado):"
Write-Output "  gh repo create maqueta-ecommerce --public --source=. --remote=origin --push"
Write-Output ""
Write-Output "Opción 2 - Manual:"
Write-Output "  1. Ve a https://github.com/new"
Write-Output "  2. Crea un repositorio llamado 'maqueta-ecommerce'"
Write-Output "  3. Ejecuta estos comandos:"
Write-Output "     git remote add origin https://github.com/TU_USUARIO/maqueta-ecommerce.git"
Write-Output "     git branch -M main"
Write-Output "     git push -u origin main"
Write-Output ""
Write-Output "=========================================="

# Preguntar si quiere intentar con GitHub CLI
$response = Read-Host "¿Tienes GitHub CLI instalado y quieres crear el repo automáticamente? (s/n)"

if ($response -eq "s" -or $response -eq "S") {
    Write-Output "Intentando crear repositorio con GitHub CLI..."
    gh repo create maqueta-ecommerce --public --source=. --remote=origin --push
    
    if ($LASTEXITCODE -eq 0) {
        Write-Output ""
        Write-Output "✅ ¡Repositorio creado y código subido exitosamente!"
        Write-Output "URL: https://github.com/$(gh api user --jq .login)/maqueta-ecommerce"
    } else {
        Write-Output ""
        Write-Output "❌ Error al crear el repositorio. Usa la opción manual."
    }
} else {
    Write-Output ""
    Write-Output "📝 Repositorio Git inicializado localmente."
    Write-Output "Sigue las instrucciones de 'Opción 2' arriba para subirlo a GitHub."
}
