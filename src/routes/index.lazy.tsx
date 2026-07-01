// src/routes/index.lazy.tsx

import { BrandWatermark } from "@/design-system/components/branding/brand-watermark";
import { Logo } from "@/design-system/components/branding/logo";
import {
  Button,
  IconButton,
} from "@/design-system/components/button/ui/button";
import { ColorModeToggleButton } from "@/design-system/components/button/ui/color-mode-button";
import { DataListTable } from "@/design-system/components/data-display/ui/data-list-table";
import { FeedbackAccessDenied } from "@/design-system/components/feedback/ui/feedback-access-denied";
import { FeedbackNoData } from "@/design-system/components/feedback/ui/feedback-no-data";
import { FeedbackNoResult } from "@/design-system/components/feedback/ui/feedback-no-result";
import { FeedbackRetry } from "@/design-system/components/feedback/ui/feedback-retry";
import {
  AppLucideIcon,
  AppTablerIcon,
} from "@/design-system/components/icon/ui/app-icon";
import { Box } from "@/design-system/components/layout/ui/box";
import { Container } from "@/design-system/components/layout/ui/container";
import { HStack, VStack } from "@/design-system/components/layout/ui/stack";
import { Link } from "@/design-system/components/typography/ui/link";
import { P } from "@/design-system/components/typography/ui/p";
import { SPACING_MD } from "@/design-system/constants/styles";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { SettingsTrigger } from "@/features/settings/components/settings";
import { getLocale, getLocaleLabel } from "@/shared/libs/i18n/-typed";
import { useLocale } from "@/shared/libs/i18n/locale-provider";
import { IconLanguage } from "@tabler/icons-react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { CogIcon } from "lucide-react";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <VStack minH={"100dvh"} bg={"bg.canvas"}>
      <KeyFeatures />
      {/* <Branding /> */}
      {/* <Buttons /> */}
      {/* <Typography /> */}
      {/* <Feedback /> */}
      <DataTable />
    </VStack>
  );
}

const KeyFeatures = () => {
  const { setLocale } = useLocale();

  return (
    <Container.Root w={"full"} p={SPACING_MD}>
      <Container.Body gap={4} p={4}>
        <P textAlign={"center"} fontWeight={"semibold"}>
          Key Features
        </P>

        <HStack wrap={"wrap"} align={"center"} justify={"center"} gap={2}>
          <SettingsTrigger modalKey={"settings"} w={"fit"}>
            <IconButton>
              <AppLucideIcon
                icon={CogIcon}
                strokeWidth={1.3}
                boxSize={"22px"}
              />
            </IconButton>
          </SettingsTrigger>

          <ColorModeToggleButton />

          <Button
            onClick={() => {
              setLocale(getLocale() === "id" ? "en" : "id");
            }}
          >
            <AppTablerIcon icon={IconLanguage} />
            {getLocaleLabel(getLocale())}
          </Button>
        </HStack>
      </Container.Body>
    </Container.Root>
  );
};

const Buttons = () => {
  return (
    <Container.Root w={"full"} p={SPACING_MD}>
      <Container.Body gap={4} p={4}>
        <P textAlign={"center"} fontWeight={"semibold"}>
          Buttons
        </P>

        <HStack wrap={"wrap"} align={"center"} justify={"center"} gap={4}>
          <Button primary>Label</Button>
          <Button variant={"surface"}>Label</Button>
          <Button variant={"subtle"}>Label</Button>
          <Button variant={"outline"}>Label</Button>
          <Button>Label</Button>
        </HStack>
      </Container.Body>
    </Container.Root>
  );
};

const Branding = () => {
  return (
    <Container.Root w={"full"} p={SPACING_MD}>
      <Container.Body gap={4} p={4}>
        <P textAlign={"center"} fontWeight={"semibold"}>
          Branding
        </P>

        <HStack wrap={"wrap"} align={"center"} justify={"center"} gap={4}>
          <Logo />

          <BrandWatermark />
        </HStack>
      </Container.Body>
    </Container.Root>
  );
};

const Typography = () => {
  return (
    <Container.Root w={"full"} p={SPACING_MD}>
      <Container.Body gap={4} p={4}>
        <P textAlign={"center"} fontWeight={"semibold"}>
          Typography
        </P>

        <HStack wrap={"wrap"} align={"center"} justify={"center"} gap={4}>
          <Link to="https://youtube.com" target="_blank">
            youtube.com
          </Link>
        </HStack>
      </Container.Body>
    </Container.Root>
  );
};

const Feedback = () => {
  return (
    <Container.Root w={"full"} p={SPACING_MD}>
      <Container.Body gap={4} p={4}>
        <P textAlign={"center"} fontWeight={"semibold"}>
          Feedback
        </P>

        <HStack wrap={"wrap"} align={"center"} justify={"center"} gap={4}>
          <FeedbackNoData />

          <FeedbackAccessDenied />

          <FeedbackNoResult />

          <FeedbackRetry />
        </HStack>
      </Container.Body>
    </Container.Root>
  );
};

const DataTable = () => {
  // Store
  const { theme } = useThemeStore();

  // Resolved Values
  const dataList = {
    headers: [
      { th: "Name", sortable: true },
      { th: "Email", sortable: true },
      { th: "Account Status", sortable: true },
      { th: "Role", sortable: true },
      { th: "Department", sortable: true },
      { th: "Phone Number", sortable: false },
      { th: "Location", sortable: true },
      { th: "Join Date", sortable: true },
      { th: "Last Active", sortable: true },
      { th: "Plan", sortable: true },
    ],

    rows: [
      {
        id: "1",
        columns: [
          { td: "Sulenq" },
          { td: "sulenq@email.com" },
          { td: "Active" },
          { td: "Developer" },
          { td: "Engineering" },
          { td: "+62 812-1111-0001" },
          { td: "Semarang" },
          { td: "2024-01-10" },
          { td: "2 hours ago" },
          { td: "Pro" },
        ],
      },
      {
        id: "2",
        columns: [
          { td: "Jolitos" },
          { td: "jolitos@email.com" },
          { td: "Suspended" },
          { td: "Designer" },
          { td: "Product" },
          { td: "+62 812-1111-0002" },
          { td: "Jakarta" },
          { td: "2023-11-22" },
          { td: "3 days ago" },
          { td: "Basic" },
        ],
      },
      {
        id: "3",
        columns: [
          { td: "Wazawsky" },
          { td: "wazawsky@email.com" },
          { td: "Suspended" },
          { td: "QA Engineer" },
          { td: "Engineering" },
          { td: "+62 812-1111-0003" },
          { td: "Bandung" },
          { td: "2023-08-15" },
          { td: "1 week ago" },
          { td: "Free" },
        ],
      },
      {
        id: "4",
        columns: [
          { td: "Rasenta" },
          { td: "rasenta@email.com" },
          { td: "Active" },
          { td: "Product Manager" },
          { td: "Product" },
          { td: "+62 812-1111-0004" },
          { td: "Surabaya" },
          { td: "2024-02-01" },
          { td: "5 minutes ago" },
          { td: "Pro" },
        ],
      },
      {
        id: "5",
        columns: [
          { td: "Dhewangga" },
          { td: "dhewangga@email.com" },
          { td: "Pending" },
          { td: "Marketing" },
          { td: "Marketing" },
          { td: "+62 812-1111-0005" },
          { td: "Yogyakarta" },
          { td: "2024-03-18" },
          { td: "1 day ago" },
          { td: "Basic" },
        ],
      },
      {
        id: "6",
        columns: [
          { td: "Kirania" },
          { td: "kirania@email.com" },
          { td: "Active" },
          { td: "Developer" },
          { td: "Engineering" },
          { td: "+62 812-1111-0006" },
          { td: "Semarang" },
          { td: "2023-12-05" },
          { td: "10 minutes ago" },
          { td: "Pro" },
        ],
      },
      {
        id: "7",
        columns: [
          { td: "Bramasetya" },
          { td: "bramasetya@email.com" },
          { td: "Suspended" },
          { td: "Sales" },
          { td: "Sales" },
          { td: "+62 812-1111-0007" },
          { td: "Medan" },
          { td: "2023-09-30" },
          { td: "2 weeks ago" },
          { td: "Free" },
        ],
      },
      {
        id: "8",
        columns: [
          { td: "Larasati" },
          { td: "larasati@email.com" },
          { td: "Active" },
          { td: "HR" },
          { td: "Human Resources" },
          { td: "+62 812-1111-0008" },
          { td: "Jakarta" },
          { td: "2024-01-25" },
          { td: "30 minutes ago" },
          { td: "Basic" },
        ],
      },
      {
        id: "9",
        columns: [
          { td: "Wirandika" },
          { td: "wirandika@email.com" },
          { td: "Pending" },
          { td: "Support" },
          { td: "Customer Support" },
          { td: "+62 812-1111-0009" },
          { td: "Malang" },
          { td: "2024-02-14" },
          { td: "4 hours ago" },
          { td: "Free" },
        ],
      },
      {
        id: "10",
        columns: [
          { td: "Anindita" },
          { td: "anindita@email.com" },
          { td: "Active" },
          { td: "Developer" },
          { td: "Engineering" },
          { td: "+62 812-1111-0010" },
          { td: "Semarang" },
          { td: "2023-10-08" },
          { td: "1 hour ago" },
          { td: "Pro" },
        ],
      },
      {
        id: "11",
        columns: [
          { td: "Gilarsa" },
          { td: "gilarsa@email.com" },
          { td: "Suspended" },
          { td: "Finance" },
          { td: "Finance" },
          { td: "+62 812-1111-0011" },
          { td: "Bali" },
          { td: "2023-07-19" },
          { td: "5 days ago" },
          { td: "Basic" },
        ],
      },
      {
        id: "12",
        columns: [
          { td: "Prameswari" },
          { td: "prameswari@email.com" },
          { td: "Active" },
          { td: "Designer" },
          { td: "Product" },
          { td: "+62 812-1111-0012" },
          { td: "Jakarta" },
          { td: "2024-03-02" },
          { td: "15 minutes ago" },
          { td: "Pro" },
        ],
      },
      {
        id: "13",
        columns: [
          { td: "Yudistira" },
          { td: "yudistira@email.com" },
          { td: "Active" },
          { td: "Developer" },
          { td: "Engineering" },
          { td: "+62 812-1111-0013" },
          { td: "Semarang" },
          { td: "2023-06-11" },
          { td: "just now" },
          { td: "Pro" },
        ],
      },
      {
        id: "14",
        columns: [
          { td: "Saraswati" },
          { td: "saraswati@email.com" },
          { td: "Pending" },
          { td: "Marketing" },
          { td: "Marketing" },
          { td: "+62 812-1111-0014" },
          { td: "Yogyakarta" },
          { td: "2024-01-30" },
          { td: "6 hours ago" },
          { td: "Basic" },
        ],
      },
      {
        id: "15",
        columns: [
          { td: "Nararya" },
          { td: "nararya@email.com" },
          { td: "Suspended" },
          { td: "Sales" },
          { td: "Sales" },
          { td: "+62 812-1111-0015" },
          { td: "Medan" },
          { td: "2023-05-27" },
          { td: "3 weeks ago" },
          { td: "Free" },
        ],
      },
      {
        id: "16",
        columns: [
          { td: "Cendrawasih" },
          { td: "cendrawasih@email.com" },
          { td: "Active" },
          { td: "QA Engineer" },
          { td: "Engineering" },
          { td: "+62 812-1111-0016" },
          { td: "Bandung" },
          { td: "2024-02-20" },
          { td: "20 minutes ago" },
          { td: "Pro" },
        ],
      },
      {
        id: "17",
        columns: [
          { td: "Baskoro" },
          { td: "baskoro@email.com" },
          { td: "Active" },
          { td: "Product Manager" },
          { td: "Product" },
          { td: "+62 812-1111-0017" },
          { td: "Surabaya" },
          { td: "2023-12-19" },
          { td: "2 hours ago" },
          { td: "Pro" },
        ],
      },
      {
        id: "18",
        columns: [
          { td: "Widuri" },
          { td: "widuri@email.com" },
          { td: "Suspended" },
          { td: "HR" },
          { td: "Human Resources" },
          { td: "+62 812-1111-0018" },
          { td: "Jakarta" },
          { td: "2023-08-08" },
          { td: "1 month ago" },
          { td: "Free" },
        ],
      },
      {
        id: "19",
        columns: [
          { td: "Pradipta" },
          { td: "pradipta@email.com" },
          { td: "Pending" },
          { td: "Support" },
          { td: "Customer Support" },
          { td: "+62 812-1111-0019" },
          { td: "Malang" },
          { td: "2024-03-05" },
          { td: "45 minutes ago" },
          { td: "Basic" },
        ],
      },
      {
        id: "20",
        columns: [
          { td: "Kusumawati" },
          { td: "kusumawati@email.com" },
          { td: "Active" },
          { td: "Finance" },
          { td: "Finance" },
          { td: "+62 812-1111-0020" },
          { td: "Bali" },
          { td: "2023-09-14" },
          { td: "just now" },
          { td: "Pro" },
        ],
      },
    ],

    batchOptions: [],

    rowOptions: [],
  };

  return (
    <Container.Root w={"full"} p={SPACING_MD}>
      <Container.Body gap={4} p={4}>
        <P textAlign={"center"} fontWeight={"semibold"}>
          Data Table
        </P>

        <Box bg={"bg.canvas"} p={4} rounded={theme.radii.component}>
          <DataListTable.Root
            headers={dataList.headers}
            rows={dataList.rows}
            maxH={"500px"}
          >
            <DataListTable.Header
            // renderBatchOptions={(ctx) => (
            //   <DataListBatchOptions
            //     selectedRows={ctx.selectedRows}
            //     clearSelectedRows={ctx.clearSelection}
            //     isAllRowsSelected={ctx.isAllRowsSelected}
            //     handleSelectAllRows={ctx.selectAllRows}
            //     batchOptions={[
            //       (selected, { clearSelectedRows }) => (
            //         <Menu.Item
            //           value="delete"
            //           onClick={() => deleteRows(selected)}
            //         >
            //           Delete {selected.length} items
            //         </Menu.Item>
            //       ),
            //     ]}
            //   />
            // )}
            />

            <DataListTable.Body
            // renderRowOptions={(row) => (
            //   <DataListRowOptions
            //     row={row}
            //     rowOptions={[
            //       (row) => (
            //         <Menu.Item value="edit" onClick={() => editRow(row)}>
            //           Edit
            //         </Menu.Item>
            //       ),
            //     ]}
            //   />
            // )}
            />

            {/* <DataListFooter
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            currentDataLength={rows.length}
            totalData={100}
          /> */}
          </DataListTable.Root>
        </Box>
      </Container.Body>
    </Container.Root>
  );
};
