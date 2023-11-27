import { Fragment } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { FacebookIcon, LineIcon } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

// 社群 icon
const socials = [
    {
        key: "fb",
        name: "facebook 社群",
        Icon: FacebookIcon,
    },
    {
        key: "line",
        name: "line 社群",
        Icon: LineIcon,
    },
    {
        key: "copy",
        name: "複製",
        Icon: faLink,
    },
];

const SocialsLayout = styled.span`
  font-size: 1.6em;
  color: #000;

  .item-share {
    min-width: auto;
    margin: 0 10px;
  }

  svg {
    vertical-align: middle;
  }

  .text-share-to {
    font-size: 0.8em;
    color: #000;
  }

  button {
    cursor: pointer;
  }
`;

const Community = ({ ...rest }) => {
    return (
        <Fragment>
            <SocialsLayout className="socials" {...rest}>
                <span className="text-share-to">文章分享至 (另開小視窗)：</span>
                {socials.map(({ key, name, Icon }) => (
                    <Button
                        key={key}
                        name={key}
                        aria-label={name}
                        value={name}
                        className="item-share"
                        icon={
                            <span style={{ position: "relative" }}>
                                {key === "copy" ? (
                                    <FontAwesomeIcon icon={Icon} />
                                ) : (
                                    <Icon size={30} borderRadius={8} />
                                )}
                            </span>
                        }
                    />
                ))}
            </SocialsLayout>
        </Fragment>
    );
};

export default Community;
