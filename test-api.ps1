function Test-Endpoint {
    param($Label, $Method, $Uri, $Body)
    Write-Host "===== $Label =====" -ForegroundColor Cyan
    try {
        if ($Body) {
            $r = Invoke-RestMethod -Uri $Uri -Method $Method -Body ($Body | ConvertTo-Json) -ContentType "application/json"
        } else {
            $r = Invoke-RestMethod -Uri $Uri -Method $Method
        }
        Write-Host "OK: $($r | ConvertTo-Json -Compress)" -ForegroundColor Green
    } catch {
        $status = $_.Exception.Response.StatusCode.value__
        Write-Host "Status $status - $($_.Exception.Message)" -ForegroundColor Yellow
    }
    Write-Host ""
}

$BASE = "http://localhost:3000"

# 1. Health check
Test-Endpoint "GET /health" GET "$BASE/health"

# 2. Get all users (empty initially)
Test-Endpoint "GET /api/v1/users" GET "$BASE/api/v1/users"

# 3. Create user - success
Test-Endpoint "POST /api/v1/users (valid)" POST "$BASE/api/v1/users" @{
    name     = "Nguyen Van A"
    email    = "test_$(Get-Random)@example.com"
    password = "123456"
    phone    = "0901234567"
}

# 4. Create user - missing required fields
Test-Endpoint "POST /api/v1/users (missing email+password)" POST "$BASE/api/v1/users" @{
    name = "No Email User"
}

# 5. Create user - duplicate email
Test-Endpoint "POST /api/v1/users (duplicate email)" POST "$BASE/api/v1/users" @{
    name     = "User A"
    email    = "duplicate@example.com"
    password = "123456"
}
Test-Endpoint "POST /api/v1/users (duplicate email again)" POST "$BASE/api/v1/users" @{
    name     = "User B"
    email    = "duplicate@example.com"
    password = "abcdef"
}

# 6. Get all users after inserts
Test-Endpoint "GET /api/v1/users (after inserts)" GET "$BASE/api/v1/users"

# 7. Frontend SPA check
Write-Host "===== GET / (Frontend SPA) =====" -ForegroundColor Cyan
try {
    $r = Invoke-WebRequest -Uri "$BASE/" -Method GET
    Write-Host "OK: Status=$($r.StatusCode), Content-Type=$($r.Headers['Content-Type'])" -ForegroundColor Green
    if ($r.Content -match "<html") {
        Write-Host "=> HTML page returned (SPA working)" -ForegroundColor Green
    }
} catch {
    Write-Host "FAIL: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""
