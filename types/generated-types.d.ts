/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SiteMetaData
// ====================================================

export interface SiteMetaData_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  title: string | null;
  description: string | null;
  siteUrl: string | null;
  image: string | null;
}

export interface SiteMetaData_site {
  __typename: "Site";
  siteMetadata: SiteMetaData_site_siteMetadata | null;
}

export interface SiteMetaData {
  site: SiteMetaData_site | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogTemplate
// ====================================================

export interface BlogTemplate_posts_nodes_fields {
  __typename: "MarkdownRemarkFields";
  slug: string | null;
}

export interface BlogTemplate_posts_nodes_frontmatter_featuredImage_childImageSharp_fluid {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface BlogTemplate_posts_nodes_frontmatter_featuredImage_childImageSharp {
  __typename: "ImageSharp";
  fluid: BlogTemplate_posts_nodes_frontmatter_featuredImage_childImageSharp_fluid | null;
}

export interface BlogTemplate_posts_nodes_frontmatter_featuredImage {
  __typename: "File";
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: BlogTemplate_posts_nodes_frontmatter_featuredImage_childImageSharp | null;
}

export interface BlogTemplate_posts_nodes_frontmatter {
  __typename: "MarkdownRemarkFrontmatter";
  title: string | null;
  description: string | null;
  date: any | null;
  categories: (string | null)[] | null;
  tags: (string | null)[] | null;
  featuredImage: BlogTemplate_posts_nodes_frontmatter_featuredImage | null;
}

export interface BlogTemplate_posts_nodes {
  __typename: "MarkdownRemark";
  id: string;
  excerpt: string | null;
  html: string | null;
  fields: BlogTemplate_posts_nodes_fields | null;
  frontmatter: BlogTemplate_posts_nodes_frontmatter | null;
}

export interface BlogTemplate_posts {
  __typename: "MarkdownRemarkConnection";
  nodes: BlogTemplate_posts_nodes[];
}

export interface BlogTemplate_categories_nodes_fields {
  __typename: "MarkdownRemarkFields";
  slug: string | null;
}

export interface BlogTemplate_categories_nodes_frontmatter_featuredImage_childImageSharp_fluid {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface BlogTemplate_categories_nodes_frontmatter_featuredImage_childImageSharp {
  __typename: "ImageSharp";
  fluid: BlogTemplate_categories_nodes_frontmatter_featuredImage_childImageSharp_fluid | null;
}

export interface BlogTemplate_categories_nodes_frontmatter_featuredImage {
  __typename: "File";
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: BlogTemplate_categories_nodes_frontmatter_featuredImage_childImageSharp | null;
}

export interface BlogTemplate_categories_nodes_frontmatter {
  __typename: "MarkdownRemarkFrontmatter";
  title: string | null;
  description: string | null;
  date: any | null;
  categories: (string | null)[] | null;
  tags: (string | null)[] | null;
  featuredImage: BlogTemplate_categories_nodes_frontmatter_featuredImage | null;
}

export interface BlogTemplate_categories_nodes {
  __typename: "MarkdownRemark";
  id: string;
  excerpt: string | null;
  html: string | null;
  fields: BlogTemplate_categories_nodes_fields | null;
  frontmatter: BlogTemplate_categories_nodes_frontmatter | null;
}

export interface BlogTemplate_categories {
  __typename: "MarkdownRemarkConnection";
  nodes: BlogTemplate_categories_nodes[];
}

export interface BlogTemplate_tags_nodes_fields {
  __typename: "MarkdownRemarkFields";
  slug: string | null;
}

export interface BlogTemplate_tags_nodes_frontmatter_featuredImage_childImageSharp_fluid {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface BlogTemplate_tags_nodes_frontmatter_featuredImage_childImageSharp {
  __typename: "ImageSharp";
  fluid: BlogTemplate_tags_nodes_frontmatter_featuredImage_childImageSharp_fluid | null;
}

export interface BlogTemplate_tags_nodes_frontmatter_featuredImage {
  __typename: "File";
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: BlogTemplate_tags_nodes_frontmatter_featuredImage_childImageSharp | null;
}

export interface BlogTemplate_tags_nodes_frontmatter {
  __typename: "MarkdownRemarkFrontmatter";
  title: string | null;
  description: string | null;
  date: any | null;
  categories: (string | null)[] | null;
  tags: (string | null)[] | null;
  featuredImage: BlogTemplate_tags_nodes_frontmatter_featuredImage | null;
}

export interface BlogTemplate_tags_nodes {
  __typename: "MarkdownRemark";
  id: string;
  excerpt: string | null;
  html: string | null;
  fields: BlogTemplate_tags_nodes_fields | null;
  frontmatter: BlogTemplate_tags_nodes_frontmatter | null;
}

export interface BlogTemplate_tags {
  __typename: "MarkdownRemarkConnection";
  nodes: BlogTemplate_tags_nodes[];
}

export interface BlogTemplate {
  posts: BlogTemplate_posts;
  categories: BlogTemplate_categories;
  tags: BlogTemplate_tags;
}

export interface BlogTemplateVariables {
  skip?: number | null;
  limit?: number | null;
  filterValue?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostTemplate
// ====================================================

export interface PostTemplate_post_fields {
  __typename: "MarkdownRemarkFields";
  slug: string | null;
}

export interface PostTemplate_post_frontmatter_featuredImage_childImageSharp_fluid {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface PostTemplate_post_frontmatter_featuredImage_childImageSharp {
  __typename: "ImageSharp";
  fluid: PostTemplate_post_frontmatter_featuredImage_childImageSharp_fluid | null;
}

export interface PostTemplate_post_frontmatter_featuredImage {
  __typename: "File";
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: PostTemplate_post_frontmatter_featuredImage_childImageSharp | null;
}

export interface PostTemplate_post_frontmatter {
  __typename: "MarkdownRemarkFrontmatter";
  title: string | null;
  description: string | null;
  date: any | null;
  categories: (string | null)[] | null;
  tags: (string | null)[] | null;
  featuredImage: PostTemplate_post_frontmatter_featuredImage | null;
}

export interface PostTemplate_post {
  __typename: "MarkdownRemark";
  id: string;
  excerpt: string | null;
  html: string | null;
  fields: PostTemplate_post_fields | null;
  frontmatter: PostTemplate_post_frontmatter | null;
}

export interface PostTemplate_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  siteUrl: string | null;
}

export interface PostTemplate_site {
  __typename: "Site";
  siteMetadata: PostTemplate_site_siteMetadata | null;
}

export interface PostTemplate {
  post: PostTemplate_post | null;
  site: PostTemplate_site | null;
}

export interface PostTemplateVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed
// ====================================================

export interface GatsbyImageSharpFixed {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_tracedSVG
// ====================================================

export interface GatsbyImageSharpFixed_tracedSVG {
  __typename: "ImageSharpFixed";
  tracedSVG: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_withWebp
// ====================================================

export interface GatsbyImageSharpFixed_withWebp {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_withWebp_tracedSVG
// ====================================================

export interface GatsbyImageSharpFixed_withWebp_tracedSVG {
  __typename: "ImageSharpFixed";
  tracedSVG: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_noBase64
// ====================================================

export interface GatsbyImageSharpFixed_noBase64 {
  __typename: "ImageSharpFixed";
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_withWebp_noBase64
// ====================================================

export interface GatsbyImageSharpFixed_withWebp_noBase64 {
  __typename: "ImageSharpFixed";
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid
// ====================================================

export interface GatsbyImageSharpFluid {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluidLimitPresentationSize
// ====================================================

export interface GatsbyImageSharpFluidLimitPresentationSize {
  __typename: "ImageSharpFluid";
  maxHeight: number;
  maxWidth: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_tracedSVG
// ====================================================

export interface GatsbyImageSharpFluid_tracedSVG {
  __typename: "ImageSharpFluid";
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_withWebp
// ====================================================

export interface GatsbyImageSharpFluid_withWebp {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_withWebp_tracedSVG
// ====================================================

export interface GatsbyImageSharpFluid_withWebp_tracedSVG {
  __typename: "ImageSharpFluid";
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_noBase64
// ====================================================

export interface GatsbyImageSharpFluid_noBase64 {
  __typename: "ImageSharpFluid";
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_withWebp_noBase64
// ====================================================

export interface GatsbyImageSharpFluid_withWebp_noBase64 {
  __typename: "ImageSharpFluid";
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions
// ====================================================

export interface GatsbyImageSharpResolutions {
  __typename: "ImageSharpResolutions";
  base64: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_tracedSVG
// ====================================================

export interface GatsbyImageSharpResolutions_tracedSVG {
  __typename: "ImageSharpResolutions";
  tracedSVG: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_withWebp
// ====================================================

export interface GatsbyImageSharpResolutions_withWebp {
  __typename: "ImageSharpResolutions";
  base64: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_withWebp_tracedSVG
// ====================================================

export interface GatsbyImageSharpResolutions_withWebp_tracedSVG {
  __typename: "ImageSharpResolutions";
  tracedSVG: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_noBase64
// ====================================================

export interface GatsbyImageSharpResolutions_noBase64 {
  __typename: "ImageSharpResolutions";
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_withWebp_noBase64
// ====================================================

export interface GatsbyImageSharpResolutions_withWebp_noBase64 {
  __typename: "ImageSharpResolutions";
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes
// ====================================================

export interface GatsbyImageSharpSizes {
  __typename: "ImageSharpSizes";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_tracedSVG
// ====================================================

export interface GatsbyImageSharpSizes_tracedSVG {
  __typename: "ImageSharpSizes";
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_withWebp
// ====================================================

export interface GatsbyImageSharpSizes_withWebp {
  __typename: "ImageSharpSizes";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_withWebp_tracedSVG
// ====================================================

export interface GatsbyImageSharpSizes_withWebp_tracedSVG {
  __typename: "ImageSharpSizes";
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_noBase64
// ====================================================

export interface GatsbyImageSharpSizes_noBase64 {
  __typename: "ImageSharpSizes";
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_withWebp_noBase64
// ====================================================

export interface GatsbyImageSharpSizes_withWebp_noBase64 {
  __typename: "ImageSharpSizes";
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostDetail
// ====================================================

export interface PostDetail_fields {
  __typename: "MarkdownRemarkFields";
  slug: string | null;
}

export interface PostDetail_frontmatter_featuredImage_childImageSharp_fluid {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface PostDetail_frontmatter_featuredImage_childImageSharp {
  __typename: "ImageSharp";
  fluid: PostDetail_frontmatter_featuredImage_childImageSharp_fluid | null;
}

export interface PostDetail_frontmatter_featuredImage {
  __typename: "File";
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: PostDetail_frontmatter_featuredImage_childImageSharp | null;
}

export interface PostDetail_frontmatter {
  __typename: "MarkdownRemarkFrontmatter";
  title: string | null;
  description: string | null;
  date: any | null;
  categories: (string | null)[] | null;
  tags: (string | null)[] | null;
  featuredImage: PostDetail_frontmatter_featuredImage | null;
}

export interface PostDetail {
  __typename: "MarkdownRemark";
  id: string;
  excerpt: string | null;
  html: string | null;
  fields: PostDetail_fields | null;
  frontmatter: PostDetail_frontmatter | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
