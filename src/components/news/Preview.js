import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import styled from "styled-components";
import styleToObject from "style-to-object";
import Community from "./Community";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  };
  const formattedDate = date.toLocaleDateString("zh-TW", options);
  return formattedDate.replace(/\//g, ".").replace("週", "");
}

const StyledPreview = styled.div`
  background-color: #f1f2f2;
  margin: 0;
  margin-bottom: 180px;

  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    line-height: 1.6;
    font-family: Noto Sans TC, Robot, 微軟正黑體, Microsoft JhengHei;
    font-size: 16px;
  }
`;

const ImageWrapper = styled.div`
  margin-left: 12em;
`;

const ArticleTitle = styled.h1`
  font-family: Noto Sans TC, Robot, 微軟正黑體, Microsoft JhengHei;
  font-size: 50px;
  line-height: 1.5;
  margin-top: 0;
`;

const ArticleContent = styled.div`
  margin-top: 100px;
  padding-left: 172px;
  padding-right: 172px;
`;

const PreviewDate = styled.h2`
  font-family: Noto Sans TC, Robot, 微軟正黑體, Microsoft JhengHei;
  font-size: 1em;
  margin-top: 0;
  margin-bottom: 0.5em;
  font-color: gray;
`;

const TagsLayout = styled.div`
  color: #144274;
  margin-top: 2.5em;
  margin-left: 1.2em;
  margin-bottom: 0.5em;
  & span {
    font-size: 1em;
    border: 1px solid rgb(23, 23, 46);
    border-radius: 8px;
    margin-right: 10px;
    padding: 2px 20px;
  }
`;

const TitleSection = styled.section`
  position: relative;

  &::before {
    content: "";
    width: 23px;
    height: 30px;
    margin-left: 172px;
    background-color: rgb(20, 66, 116);
    border-radius: 0% 70% 70% 0px;
    position: absolute;
    left: 0px;
    bottom: -15px;
  }
`;

const Preview = ({ article }) => {
  console.log("Previewing article:", article);

  const options = {
    replace: ({ attribs, name }) => {
      if (name === "img") {
        let style = {};
        styleToObject(attribs.style, (propertyName, value) => {
          style[propertyName] = value;
        });
        return (
          <ImageWrapper>
            <img src={attribs.src} alt={attribs.alt} style={style} />
          </ImageWrapper>
        );
      }
    },
  };

  return (
    <StyledPreview>
      <div style={{display: "flex",  alignItems: "center",  justifyContent: "center"}}>
        <p>預覽和實際排版可能因為樣式而有小差異</p>
      </div>
      <Image
        src="/admin/previewHeader.png"
        width="1543"
        height="184"
        alt="header"
      />
      <div className="previewContent" style={{ marginBottom: "10em" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{marginLeft: "7.25em", fontSize: "19.2px", paddingTop: "2em"}}>
            :::
          </div>
          <TagsLayout>
            {article.tags.map((tag) => {
              const tagitem = article.newsTags.find(
                (newTag) => newTag.id === tag
              );
              return <span key={tagitem.id}>{tagitem.name}</span>;
            })}
          </TagsLayout>
        </div>
        <TitleSection>
          <div
            style={{
              paddingBottom: 30,
              borderBottom: "2px solid",
              marginLeft: 172,
              marginRight: 172,
            }}
          >
            <ArticleTitle> {article.title} </ArticleTitle>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <PreviewDate>
                {" "}
                {formatDate(article.createAt)}{" "}
                {article.updateAt
                  ? `，更新於 ${formatDate(article.updateAt)}`
                  : ""}
              </PreviewDate>
              <Community />
            </div>
          </div>
        </TitleSection>
        <ArticleContent>
          {parse(article.content ? article.content : "<br/>", options)}
        </ArticleContent>
      </div>
      <Image
        src="/admin/previewFooter.jpg"
        width="1543"
        height="905"
        alt="footer"
      />
    </StyledPreview>
  );
};

export default Preview;
