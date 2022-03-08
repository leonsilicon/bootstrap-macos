import { execaCommandSync as exec } from "execa";

exec("curl -fsSL https://get.pnpm.io/install.sh | sh -", { shell: true });
