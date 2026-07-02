// src/features/root/components/root.page.tsx

import { BrandWatermark } from "@/design-system/components/branding/brand-watermark";
import { Logo } from "@/design-system/components/branding/logo";
import {
  Button,
  IconButton,
} from "@/design-system/components/button/ui/button";
import { ColorModeToggleButton } from "@/design-system/components/button/ui/color-mode-button";
import type {
  DataListBatchActionsGenerator,
  DataListItemActionsGenerator,
} from "@/design-system/components/data-display/types/data-list.type";
import { DataListFooter } from "@/design-system/components/data-display/ui/data-list-footer";
import { DataListTable } from "@/design-system/components/data-display/ui/data-list-table";
import { FeedbackAccessDenied } from "@/design-system/components/feedback/ui/feedback-state.access-denied";
import { FeedbackNoData } from "@/design-system/components/feedback/ui/feedback-state.no-data";
import { FeedbackNoResult } from "@/design-system/components/feedback/ui/feedback-state.no-result";
import { FeedbackRetry } from "@/design-system/components/feedback/ui/feedback-state.retry";
import {
  AppLucideIcon,
  AppTablerIcon,
} from "@/design-system/components/icon/ui/app-icon";
import { Box } from "@/design-system/components/layout/ui/box";
import { Container } from "@/design-system/components/layout/ui/container";
import { HStack, VStack } from "@/design-system/components/layout/ui/stack";
import { Menu } from "@/design-system/components/overlay/ui/menu";
import { Link } from "@/design-system/components/navigation/ui/link";
import { P } from "@/design-system/components/typography/ui/p";
import { SPACING_MD } from "@/design-system/constants/styles";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { SettingsTrigger } from "@/features/settings/components/settings";
import { getLocale, getLocaleLabel } from "@/shared/libs/i18n/-typed";
import { useLocale } from "@/shared/libs/i18n/locale-provider";
import { isEmptyArray } from "@/shared/utils/data/array";
import { IconEdit, IconLanguage, IconTrash } from "@tabler/icons-react";
import { CogIcon } from "lucide-react";
import { useState } from "react";

export const RootPage = () => {
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
};

export const KeyFeatures = () => {
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

export const Buttons = () => {
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

export const Branding = () => {
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

export const Typography = () => {
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

export const Feedback = () => {
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

export const DataTable = () => {
  // Stores
  const { theme } = useThemeStore();

  // Response data - dynamicaly changes depends on filters (search, perPage per page, pagination, etc.)
  const dataList = {
    fields: [
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

    items: [
      {
        id: "1",
        data: {
          name: "Sulenq",
          email: "sulenq@email.com",
          accountStatus: "Active",
          role: "Developer",
          department: "Engineering",
          phoneNumber: "+62 812-1111-0001",
          location: "Semarang",
          joinDate: "2024-01-10",
          lastActive: "2 hours ago",
          plan: "Pro",
        },
        columns: [
          { value: "Sulenq", td: "Sulenq" },
          { value: "sulenq@email.com", td: "sulenq@email.com" },
          { value: "Active", td: "Active" },
          { value: "Developer", td: "Developer" },
          { value: "Engineering", td: "Engineering" },
          { value: "+62 812-1111-0001", td: "+62 812-1111-0001" },
          { value: "Semarang", td: "Semarang" },
          { value: "2024-01-10", td: "2024-01-10" },
          { value: "2 hours ago", td: "2 hours ago" },
          { value: "Pro", td: "Pro" },
        ],
      },
      {
        id: "2",
        data: {
          name: "Jolitos",
          email: "jolitos@email.com",
          accountStatus: "Suspended",
          role: "Designer",
          department: "Product",
          phoneNumber: "+62 812-1111-0002",
          location: "Jakarta",
          joinDate: "2023-11-22",
          lastActive: "3 days ago",
          plan: "Basic",
        },
        columns: [
          { value: "Jolitos", td: "Jolitos" },
          { value: "jolitos@email.com", td: "jolitos@email.com" },
          { value: "Suspended", td: "Suspended" },
          { value: "Designer", td: "Designer" },
          { value: "Product", td: "Product" },
          { value: "+62 812-1111-0002", td: "+62 812-1111-0002" },
          { value: "Jakarta", td: "Jakarta" },
          { value: "2023-11-22", td: "2023-11-22" },
          { value: "3 days ago", td: "3 days ago" },
          { value: "Basic", td: "Basic" },
        ],
      },
      {
        id: "3",
        data: {
          name: "Wazawsky",
          email: "wazawsky@email.com",
          accountStatus: "Suspended",
          role: "QA Engineer",
          department: "Engineering",
          phoneNumber: "+62 812-1111-0003",
          location: "Bandung",
          joinDate: "2023-08-15",
          lastActive: "1 week ago",
          plan: "Free",
        },
        columns: [
          { value: "Wazawsky", td: "Wazawsky" },
          { value: "wazawsky@email.com", td: "wazawsky@email.com" },
          { value: "Suspended", td: "Suspended" },
          { value: "QA Engineer", td: "QA Engineer" },
          { value: "Engineering", td: "Engineering" },
          { value: "+62 812-1111-0003", td: "+62 812-1111-0003" },
          { value: "Bandung", td: "Bandung" },
          { value: "2023-08-15", td: "2023-08-15" },
          { value: "1 week ago", td: "1 week ago" },
          { value: "Free", td: "Free" },
        ],
      },
      {
        id: "4",
        data: {
          name: "Rasenta",
          email: "rasenta@email.com",
          accountStatus: "Active",
          role: "Product Manager",
          department: "Product",
          phoneNumber: "+62 812-1111-0004",
          location: "Surabaya",
          joinDate: "2024-02-01",
          lastActive: "5 minutes ago",
          plan: "Pro",
        },
        columns: [
          { value: "Rasenta", td: "Rasenta" },
          { value: "rasenta@email.com", td: "rasenta@email.com" },
          { value: "Active", td: "Active" },
          { value: "Product Manager", td: "Product Manager" },
          { value: "Product", td: "Product" },
          { value: "+62 812-1111-0004", td: "+62 812-1111-0004" },
          { value: "Surabaya", td: "Surabaya" },
          { value: "2024-02-01", td: "2024-02-01" },
          { value: "5 minutes ago", td: "5 minutes ago" },
          { value: "Pro", td: "Pro" },
        ],
      },
      {
        id: "5",
        data: {
          name: "Dhewangga",
          email: "dhewangga@email.com",
          accountStatus: "Pending",
          role: "Marketing",
          department: "Marketing",
          phoneNumber: "+62 812-1111-0005",
          location: "Yogyakarta",
          joinDate: "2024-03-18",
          lastActive: "1 day ago",
          plan: "Basic",
        },
        columns: [
          { value: "Dhewangga", td: "Dhewangga" },
          { value: "dhewangga@email.com", td: "dhewangga@email.com" },
          { value: "Pending", td: "Pending" },
          { value: "Marketing", td: "Marketing" },
          { value: "Marketing", td: "Marketing" },
          { value: "+62 812-1111-0005", td: "+62 812-1111-0005" },
          { value: "Yogyakarta", td: "Yogyakarta" },
          { value: "2024-03-18", td: "2024-03-18" },
          { value: "1 day ago", td: "1 day ago" },
          { value: "Basic", td: "Basic" },
        ],
      },
      {
        id: "6",
        data: {
          name: "Kirania",
          email: "kirania@email.com",
          accountStatus: "Active",
          role: "Developer",
          department: "Engineering",
          phoneNumber: "+62 812-1111-0006",
          location: "Semarang",
          joinDate: "2023-12-05",
          lastActive: "10 minutes ago",
          plan: "Pro",
        },
        columns: [
          { value: "Kirania", td: "Kirania" },
          { value: "kirania@email.com", td: "kirania@email.com" },
          { value: "Active", td: "Active" },
          { value: "Developer", td: "Developer" },
          { value: "Engineering", td: "Engineering" },
          { value: "+62 812-1111-0006", td: "+62 812-1111-0006" },
          { value: "Semarang", td: "Semarang" },
          { value: "2023-12-05", td: "2023-12-05" },
          { value: "10 minutes ago", td: "10 minutes ago" },
          { value: "Pro", td: "Pro" },
        ],
      },
      {
        id: "7",
        data: {
          name: "Bramasetya",
          email: "bramasetya@email.com",
          accountStatus: "Suspended",
          role: "Sales",
          department: "Sales",
          phoneNumber: "+62 812-1111-0007",
          location: "Medan",
          joinDate: "2023-09-30",
          lastActive: "2 weeks ago",
          plan: "Free",
        },
        columns: [
          { value: "Bramasetya", td: "Bramasetya" },
          { value: "bramasetya@email.com", td: "bramasetya@email.com" },
          { value: "Suspended", td: "Suspended" },
          { value: "Sales", td: "Sales" },
          { value: "Sales", td: "Sales" },
          { value: "+62 812-1111-0007", td: "+62 812-1111-0007" },
          { value: "Medan", td: "Medan" },
          { value: "2023-09-30", td: "2023-09-30" },
          { value: "2 weeks ago", td: "2 weeks ago" },
          { value: "Free", td: "Free" },
        ],
      },
      {
        id: "8",
        data: {
          name: "Larasati",
          email: "larasati@email.com",
          accountStatus: "Active",
          role: "HR",
          department: "Human Resources",
          phoneNumber: "+62 812-1111-0008",
          location: "Jakarta",
          joinDate: "2024-01-25",
          lastActive: "30 minutes ago",
          plan: "Basic",
        },
        columns: [
          { value: "Larasati", td: "Larasati" },
          { value: "larasati@email.com", td: "larasati@email.com" },
          { value: "Active", td: "Active" },
          { value: "HR", td: "HR" },
          { value: "Human Resources", td: "Human Resources" },
          { value: "+62 812-1111-0008", td: "+62 812-1111-0008" },
          { value: "Jakarta", td: "Jakarta" },
          { value: "2024-01-25", td: "2024-01-25" },
          { value: "30 minutes ago", td: "30 minutes ago" },
          { value: "Basic", td: "Basic" },
        ],
      },
      {
        id: "9",
        data: {
          name: "Wirandika",
          email: "wirandika@email.com",
          accountStatus: "Pending",
          role: "Support",
          department: "Customer Support",
          phoneNumber: "+62 812-1111-0009",
          location: "Malang",
          joinDate: "2024-02-14",
          lastActive: "4 hours ago",
          plan: "Free",
        },
        columns: [
          { value: "Wirandika", td: "Wirandika" },
          { value: "wirandika@email.com", td: "wirandika@email.com" },
          { value: "Pending", td: "Pending" },
          { value: "Support", td: "Support" },
          { value: "Customer Support", td: "Customer Support" },
          { value: "+62 812-1111-0009", td: "+62 812-1111-0009" },
          { value: "Malang", td: "Malang" },
          { value: "2024-02-14", td: "2024-02-14" },
          { value: "4 hours ago", td: "4 hours ago" },
          { value: "Free", td: "Free" },
        ],
      },
      {
        id: "10",
        data: {
          name: "Anindita",
          email: "anindita@email.com",
          accountStatus: "Active",
          role: "Developer",
          department: "Engineering",
          phoneNumber: "+62 812-1111-0010",
          location: "Semarang",
          joinDate: "2023-10-08",
          lastActive: "1 hour ago",
          plan: "Pro",
        },
        columns: [
          { value: "Anindita", td: "Anindita" },
          { value: "anindita@email.com", td: "anindita@email.com" },
          { value: "Active", td: "Active" },
          { value: "Developer", td: "Developer" },
          { value: "Engineering", td: "Engineering" },
          { value: "+62 812-1111-0010", td: "+62 812-1111-0010" },
          { value: "Semarang", td: "Semarang" },
          { value: "2023-10-08", td: "2023-10-08" },
          { value: "1 hour ago", td: "1 hour ago" },
          { value: "Pro", td: "Pro" },
        ],
      },
    ],

    batchActions: [
      (selectedItems) => {
        return (
          <Menu.Item
            value={"delete"}
            disabled={isEmptyArray(selectedItems)}
            onClick={() => {
              console.log(selectedItems);
            }}
          >
            <AppTablerIcon icon={IconTrash} size={"sm"} />
            Delete
          </Menu.Item>
        );
      },
    ] as DataListBatchActionsGenerator[],

    itemActions: [
      (item) => {
        return (
          <Menu.Item
            value={"edit"}
            onClick={() => {
              console.log(item);
            }}
          >
            <AppTablerIcon icon={IconEdit} size={"sm"} />
            Edit
          </Menu.Item>
        );
      },
    ] as DataListItemActionsGenerator[],
  };

  // States
  const [perPage, setPerPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);

  return (
    <Container.Root w={"full"} p={SPACING_MD}>
      <Container.Body gap={4} p={4}>
        <P textAlign={"center"} fontWeight={"semibold"}>
          Data Table
        </P>

        <Box bg={"bg.canvas"} p={4} rounded={theme.radii.component}>
          <DataListTable.Root
            headers={dataList.fields}
            items={dataList.items}
            batchActions={dataList.batchActions}
            itemActions={dataList.itemActions}
            maxH={"500px"}
          >
            <DataListTable.Header />

            <DataListTable.Body />
          </DataListTable.Root>

          <DataListFooter
            perPage={perPage}
            setPerPage={setPerPage}
            page={page}
            setPage={setPage}
            currentDataLength={dataList.items.length}
            totalData={100}
          />
        </Box>
      </Container.Body>
    </Container.Root>
  );
};
