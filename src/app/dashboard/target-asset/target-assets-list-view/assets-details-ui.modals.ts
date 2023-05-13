import {
    BookOutline,
    EnvironmentOutline,
    LaptopOutline,
    ProfileOutline,
    UsbOutline,
    UserOutline
} from '@ant-design/icons-angular/icons';
import {IconDefinition} from "@ant-design/icons-angular";

export interface AssetDetailsUI {
    icon: IconDefinition;
    title: string;
    iconText: string;
    key: string;
}

export let listAssetDetails: AssetDetailsUI[] = [
    {
        icon: LaptopOutline,
        iconText: 'laptop',
        title: 'CPUs',
        key: 'cpu'
    },
    {
        icon: UsbOutline,
        iconText: 'usb',
        title: 'Memory',
        key: 'ram'
    },
    {
        icon: EnvironmentOutline,
        iconText: 'environment',
        title: 'Location',
        key: 'location'
    },
    {
        icon: UserOutline,
        iconText: 'user',
        title: 'User',
        key: 'owner'
    },
    {
        icon: BookOutline,
        iconText: 'book',
        title: 'Status',
        key: 'status'
    }
]
