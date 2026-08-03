FutureService
├─ id, name, slug, description, tech, hosting, domain
├─ highlight, initialPrice, included
└─ features: Feature[]
└─ name, icon, included
└─ orders: ServiceOrder[]

Client
├─ id, name, email, phone
└─ orders: ServiceOrder[]

ServiceOrder
├─ id, projectName, status, initialPrice, totalPrice, requirements
├─ client: Client
├─ service: FutureService
├─ additionalItems: ServiceOrderItem[]
└─ tasks: Task[]
├─ title
├─ status (NOT_STARTED, IN_PROGRESS, DONE, TESTED)
├─ assignee: User
├─ githubIssueId / githubUrl
├─ orderItemId? → ServiceOrderItem
└─ orderId? → ServiceOrder

ServiceOrderItem
├─ id, code, description, quantity, unitPrice, totalPrice, type (FEATURE/EXTRA/BUGFIX)
├─ order: ServiceOrder
└─ tasks: Task[]

User (developer)
├─ id, name, email, role (ADMIN/USER)
└─ tasks: Task[]

GitHub Integration
├─ Task.githubIssueId ↔ GitHub Issue number
├─ Task.githubUrl ↔ GitHub Issue URL
└─ Webhook: issue closed → Task.status = DONE/TESTED

Flux vizual pentru client și intern

Client vede:

    ServiceOrder → ce proiect are

    ServiceOrderItem → ce feature/extra/bugfix a fost implementat

    Task → cine a lucrat și status (IN_PROGRESS / DONE / TESTED)

    Opțional: link GitHub pentru progres vizibil

Intern / Developer:

    Creează Task-uri, le atribuie developerilor

    Poate conecta task-urile la GitHub issues

    Status-ul task-urilor se sincronizează automat cu GitHub (webhook)

Extras / Feature / Bugfix:

    Extras → opțional ales de client

    Feature → parte standard din serviciu

    Bugfix → modificări post-livrare
