import { Avatar } from '@mui/material';

export default function AvatarCustom({ alt, src, stringAva, width = 55, height = 55, passProps }) {
    const stringToColor = (string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    };

    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
                width: width,
                height: height,
                fontSize: 25,
                cursor: 'pointer',
            },
            children: name[0],
        };
    };
    return <Avatar alt={alt} src={src} {...stringAvatar(stringAva)} {...passProps} />;
}
