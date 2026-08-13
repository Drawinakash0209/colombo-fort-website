import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAward extends Struct.ComponentSchema {
  collectionName: 'components_shared_awards';
  info: {
    description: '';
    displayName: 'Award';
    icon: 'trophy';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface SharedDonationMethod extends Struct.ComponentSchema {
  collectionName: 'components_shared_donation_methods';
  info: {
    description: '';
    displayName: 'DonationMethod';
    icon: 'wallet';
  };
  attributes: {
    accountName: Schema.Attribute.String;
    accountNumber: Schema.Attribute.String;
    bankName: Schema.Attribute.String;
    branch: Schema.Attribute.String;
    instructions: Schema.Attribute.Text;
    link: Schema.Attribute.String;
    qrImage: Schema.Attribute.Media<'images'>;
    swiftCode: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_cards';
  info: {
    description: "A single service/offering card, e.g. shown on the 'What We Do' section";
    displayName: 'FeatureCard';
    icon: 'grid';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedListItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_list_items';
  info: {
    description: 'A single short bullet-point line, e.g. shown in a benefits or eligibility list';
    displayName: 'ListItem';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface SharedPastPresident extends Struct.ComponentSchema {
  collectionName: 'components_shared_past_presidents';
  info: {
    description: "A past president shown in the Our Journey page's Past Presidents section";
    displayName: 'PastPresident';
    icon: 'crown';
  };
  attributes: {
    name: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images'>;
    year: Schema.Attribute.String;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: '';
    displayName: 'SocialLink';
    icon: 'link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube', 'TikTok']
    >;
    url: Schema.Attribute.String;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    description: 'A single stat card (label + value) shown in the homepage summary section';
    displayName: 'Stat';
    icon: 'chart-bar';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    description: 'A short label/category tag shown on a blog post';
    displayName: 'Tag';
    icon: 'hashtag';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface SharedValueItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_value_items';
  info: {
    description: 'A single core value shown on the Who We Are page';
    displayName: 'ValueItem';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.award': SharedAward;
      'shared.donation-method': SharedDonationMethod;
      'shared.feature-card': SharedFeatureCard;
      'shared.list-item': SharedListItem;
      'shared.past-president': SharedPastPresident;
      'shared.social-link': SharedSocialLink;
      'shared.stat': SharedStat;
      'shared.tag': SharedTag;
      'shared.value-item': SharedValueItem;
    }
  }
}
