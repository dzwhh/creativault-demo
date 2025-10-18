'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductsFilters } from './products-filters';
import { WatchTutorialButton } from '@/components/ui/watch-tutorial-button';

// 平台图标组件
const TikTokIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 290" className={className}>
    <path fill="#FF004F" d="M189.72 104.421c18.678 13.345 41.56 21.197 66.273 21.197v-47.53a67 67 0 0 1-13.918-1.456v37.413c-24.711 0-47.59-7.851-66.272-21.195v96.996c0 48.523-39.356 87.855-87.9 87.855c-18.113 0-34.949-5.473-48.934-14.86c15.962 16.313 38.222 26.432 62.848 26.432c48.548 0 87.905-39.332 87.905-87.857v-96.995zm17.17-47.952c-9.546-10.423-15.814-23.893-17.17-38.785v-6.113h-13.189c3.32 18.927 14.644 35.097 30.358 44.898M69.673 225.607a40 40 0 0 1-8.203-24.33c0-22.192 18.001-40.186 40.21-40.186a40.3 40.3 0 0 1 12.197 1.883v-48.593c-4.61-.631-9.262-.9-13.912-.801v37.822a40.3 40.3 0 0 0-12.203-1.882c-22.208 0-40.208 17.992-40.208 40.187c0 15.694 8.997 29.281 22.119 35.9"/>
    <path d="M175.803 92.849c18.683 13.344 41.56 21.195 66.272 21.195V76.631c-13.794-2.937-26.005-10.141-35.186-20.162c-15.715-9.802-27.038-25.972-30.358-44.898h-34.643v189.843c-.079 22.132-18.049 40.052-40.21 40.052c-13.058 0-24.66-6.221-32.007-15.86c-13.12-6.618-22.118-20.206-22.118-35.898c0-22.193 18-40.187 40.208-40.187c4.255 0 8.356.662 12.203 1.882v-37.822c-47.692.985-86.047 39.933-86.047 87.834c0 23.912 9.551 45.589 25.053 61.428c13.985 9.385 30.82 14.86 48.934 14.86c48.545 0 87.9-39.335 87.9-87.857z"/>
    <path fill="#00F2EA" d="M242.075 76.63V66.516a66.3 66.3 0 0 1-35.186-10.047a66.47 66.47 0 0 0 35.186 20.163M176.53 11.57a68 68 0 0 1-.728-5.457V0h-47.834v189.845c-.076 22.13-18.046 40.05-40.208 40.05a40.06 40.06 0 0 1-18.09-4.287c7.347 9.637 18.949 15.857 32.007 15.857c22.16 0 40.132-17.918 40.21-40.05V11.571zM99.966 113.58v-10.769a89 89 0 0 0-12.061-.818C39.355 101.993 0 141.327 0 189.845c0 30.419 15.467 57.227 38.971 72.996c-15.502-15.838-25.053-37.516-25.053-61.427c0-47.9 38.354-86.848 86.048-87.833"/>
  </svg>
);

const AmazonIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 128 128" className={className}>
                          <path fill="#252f3e" d="M36.379 53.64c0 1.56.168 2.825.465 3.75c.336.926.758 1.938 1.347 3.032c.207.336.293.672.293.969c0 .418-.254.84-.8 1.261l-2.653 1.77c-.379.25-.758.379-1.093.379c-.422 0-.844-.211-1.266-.59a13.3 13.3 0 0 1-1.516-1.98a34 34 0 0 1-1.304-2.485q-4.924 5.813-12.38 5.813c-3.535 0-6.355-1.012-8.421-3.032c-2.063-2.023-3.114-4.718-3.114-8.086c0-3.578 1.262-6.484 3.833-8.671c2.566-2.192 5.976-3.286 10.316-3.286c1.43 0 2.902.125 4.46.336c1.56.211 3.161.547 4.845.926v-3.074c0-3.2-.676-5.43-1.98-6.734C26.061 32.633 23.788 32 20.546 32c-1.473 0-2.988.168-4.547.547a33.4 33.4 0 0 0-4.547 1.433c-.676.293-1.18.461-1.473.547c-.296.082-.507.125-.675.125c-.59 0-.883-.422-.883-1.304v-2.063c0-.676.082-1.18.293-1.476c.21-.293.59-.586 1.18-.883q2.21-1.137 5.304-1.895c2.063-.547 4.254-.8 6.57-.8c5.008 0 8.672 1.136 11.032 3.41c2.316 2.273 3.492 5.726 3.492 10.359v13.64Zm-17.094 6.403c1.387 0 2.82-.254 4.336-.758c1.516-.508 2.863-1.433 4-2.695c.672-.8 1.18-1.684 1.43-2.695c.254-1.012.422-2.23.422-3.665v-1.765a34 34 0 0 0-3.871-.719a32 32 0 0 0-3.961-.25c-2.82 0-4.883.547-6.274 1.684c-1.387 1.136-2.062 2.734-2.062 4.84c0 1.98.504 3.453 1.558 4.464c1.012 1.051 2.485 1.559 4.422 1.559m33.809 4.547c-.758 0-1.262-.125-1.598-.422c-.34-.254-.633-.84-.887-1.64L40.715 29.98c-.25-.843-.38-1.39-.38-1.687c0-.672.337-1.05 1.013-1.05h4.125c.8 0 1.347.124 1.644.421c.336.25.59.84.84 1.64l7.074 27.876l6.57-27.875c.208-.84.462-1.39.797-1.64c.34-.255.93-.423 1.688-.423h3.367c.8 0 1.348.125 1.684.422c.336.25.633.84.8 1.64l6.653 28.212l7.285-28.211c.25-.84.547-1.39.84-1.64c.336-.255.887-.423 1.644-.423h3.914c.676 0 1.055.336 1.055 1.051c0 .21-.043.422-.086.676s-.125.59-.293 1.05L80.801 62.57c-.254.84-.547 1.387-.887 1.64c-.336.255-.883.423-1.598.423h-3.62c-.801 0-1.348-.13-1.684-.422c-.34-.297-.633-.844-.801-1.684l-6.527-27.16l-6.485 27.117c-.21.844-.46 1.391-.8 1.684c-.337.297-.926.422-1.684.422Zm54.105 1.137c-2.187 0-4.379-.254-6.484-.758s-3.746-1.055-4.84-1.684c-.676-.379-1.137-.8-1.305-1.18a2.9 2.9 0 0 1-.254-1.18v-2.148c0-.882.336-1.304.97-1.304q.376 0 .757.129c.25.082.629.25 1.05.418a23 23 0 0 0 4.634 1.476c1.683.336 3.324.504 5.011.504c2.653 0 4.715-.465 6.145-1.39c1.433-.926 2.191-2.274 2.191-4c0-1.18-.379-2.145-1.136-2.946c-.758-.8-2.192-1.516-4.254-2.191l-6.106-1.895c-3.074-.969-5.348-2.398-6.734-4.293c-1.39-1.855-2.106-3.918-2.106-6.105q0-2.655 1.137-4.676a10.8 10.8 0 0 1 3.031-3.453c1.262-.965 2.696-1.684 4.38-2.188s3.452-.715 5.304-.715c.926 0 1.894.043 2.82.168c.969.125 1.852.293 2.738.461c.84.211 1.641.422 2.399.676q1.137.379 1.77.758c.59.336 1.011.672 1.261 1.05q.38.509.379 1.391v1.98c0 .884-.336 1.348-.969 1.348c-.336 0-.883-.171-1.597-.507q-3.604-1.641-8.086-1.641c-2.399 0-4.293.379-5.598 1.18c-1.309.797-1.98 2.02-1.98 3.746c0 1.18.421 2.191 1.261 2.988c.844.8 2.403 1.602 4.633 2.316l5.98 1.895c3.032.969 5.22 2.316 6.524 4.043s1.938 3.707 1.938 5.895c0 1.812-.38 3.453-1.094 4.882c-.758 1.434-1.77 2.696-3.074 3.707c-1.305 1.051-2.864 1.809-4.672 2.36c-1.895.586-3.875.883-6.024.883m0 0"/>
                          <path fill="#f90" d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832c-1.223.883-1.012 2.062.336 1.894c4.508-.547 14.44-1.726 16.21.547c1.77 2.23-1.976 11.62-3.663 15.79c-.504 1.26.59 1.769 1.726.8c7.41-6.231 9.348-19.242 7.832-21.137c-.757-.925-4.388-1.79-8.82-1.726M1.63 75.859c-.927.116-1.347 1.236-.368 2.121c16.508 14.902 38.359 23.872 62.613 23.872c17.305 0 37.43-5.43 51.281-15.66c2.273-1.688.297-4.254-2.02-3.204c-15.534 6.57-32.421 9.77-47.788 9.77c-22.778 0-44.8-6.273-62.653-16.633c-.39-.231-.755-.304-1.064-.266z"/>
                        </svg>
);

const ShopifyIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 292" className={className}><path fill="#95BF46" d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357a19614 19614 0 0 0-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805c-.19.056-3.388 1.043-8.678 2.68c-5.18-14.906-14.322-28.604-30.405-28.604c-.444 0-.901.018-1.358.044C129.31 3.407 123.644.779 118.75.779c-37.465 0-55.364 46.835-60.976 70.635c-14.558 4.511-24.9 7.718-26.221 8.133c-8.126 2.549-8.383 2.805-9.45 10.462C21.3 95.806.038 260.235.038 260.235l165.678 31.042l89.77-19.42S223.973 58.8 223.775 57.34M156.49 40.848l-14.019 4.339c.005-.988.01-1.96.01-3.023c0-9.264-1.286-16.723-3.349-22.636c8.287 1.04 13.806 10.469 17.358 21.32m-27.638-19.483c2.304 5.773 3.802 14.058 3.802 25.238c0 .572-.005 1.095-.01 1.624c-9.117 2.824-19.024 5.89-28.953 8.966c5.575-21.516 16.025-31.908 25.161-35.828m-11.131-10.537c1.617 0 3.246.549 4.805 1.622c-12.007 5.65-24.877 19.88-30.312 48.297l-22.886 7.088C75.694 46.16 90.81 10.828 117.72 10.828"/><path fill="#5E8E3E" d="M221.237 54.983a19614 19614 0 0 0-23.383-1.743s-15.507-15.395-17.209-17.099c-.637-.634-1.496-.959-2.394-1.099l-12.527 256.233l89.762-19.418S223.972 58.8 223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357"/><path fill="#FFF" d="m135.242 104.585l-11.069 32.926s-9.698-5.176-21.586-5.176c-17.428 0-18.305 10.937-18.305 13.693c0 15.038 39.2 20.8 39.2 56.024c0 27.713-17.577 45.558-41.277 45.558c-28.44 0-42.984-17.7-42.984-17.7l7.615-25.16s14.95 12.835 27.565 12.835c8.243 0 11.596-6.49 11.596-11.232c0-19.616-32.16-20.491-32.16-52.724c0-27.129 19.472-53.382 58.778-53.382c15.145 0 22.627 4.338 22.627 4.338"/></svg>
);

interface Product {
  id: string;
  rank: number;
  image: string;
  name: string;
  price: string;
  country: string;
  countryFlag: string;
  storeName: string;
  storeAvatar: string;
  storeFollowers: string;
  category: string;
  commission: string;
  sales: number;
  conversionRate: string;
  revenue: string;
  orders: string;
  totalRevenue: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    rank: 1,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
    name: 'Protein Loaded Coffee Energy Drink',
    price: '$2.15',
    country: 'United States',
    countryFlag: '🇺🇸',
    storeName: 'Caffeine, Candies & Chaos',
    storeAvatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop',
    storeFollowers: '173.08K',
    category: 'Coffee',
    commission: '12%',
    sales: 8977,
    conversionRate: '125.27%',
    revenue: '$29K',
    orders: '272.6K',
    totalRevenue: '$727.2K',
  },
  {
    id: '2',
    rank: 2,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&h=200&fit=crop',
    name: 'Zero Sugar Best Seller Trio - Vitamin Gummies',
    price: '$32.98',
    country: 'United States',
    countryFlag: '🇺🇸',
    storeName: 'Goli Nutrition',
    storeAvatar: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop',
    storeFollowers: '422.94K',
    category: 'Health Supplements',
    commission: '25%',
    sales: 5239,
    conversionRate: '-4.52%',
    revenue: '$172.7K',
    orders: '388.7K',
    totalRevenue: '$1.23M',
  },
  {
    id: '3',
    rank: 3,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop',
    name: 'OSEA Undaria Algae Body Oil - Organic Skincare',
    price: '$20.00',
    country: 'United States',
    countryFlag: '🇺🇸',
    storeName: 'OSEA Malibu',
    storeAvatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop',
    storeFollowers: '41K',
    category: 'Body Care',
    commission: '-',
    sales: 4772,
    conversionRate: '-',
    revenue: '$95.4K',
    orders: '70.2K',
    totalRevenue: '$140.4K',
  },
  {
    id: '4',
    rank: 4,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop',
    name: 'Extensionist Mascara, Length & Volume',
    price: '$15.99',
    country: 'United States',
    countryFlag: '🇺🇸',
    storeName: 'loréal paris usa',
    storeAvatar: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop',
    storeFollowers: '387.9K',
    category: 'Mascara',
    commission: '15%',
    sales: 4699,
    conversionRate: '33.46%',
    revenue: '$75.1K',
    orders: '95.4K',
    totalRevenue: '$1.53M',
  },
  {
    id: '5',
    rank: 5,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
    name: 'GuruNanda Whitening Strips - 28 Day Treatment',
    price: '$9.99',
    country: 'United States',
    countryFlag: '🇺🇸',
    storeName: 'GuruNanda LLC',
    storeAvatar: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=100&h=100&fit=crop',
    storeFollowers: '486.83K',
    category: 'Teeth Whitening',
    commission: '15%',
    sales: 4143,
    conversionRate: '39.82%',
    revenue: '$41.3K',
    orders: '998.8K',
    totalRevenue: '$8.69M',
  },
  {
    id: '6',
    rank: 6,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop',
    name: 'Wireless Bluetooth Headphones - Noise Cancelling',
    price: '$79.99',
    country: 'United States',
    countryFlag: '🇺🇸',
    storeName: 'TechSound Pro',
    storeAvatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=100&h=100&fit=crop',
    storeFollowers: '256.3K',
    category: 'Electronics',
    commission: '18%',
    sales: 3892,
    conversionRate: '45.23%',
    revenue: '$311K',
    orders: '156K',
    totalRevenue: '$2.35M',
  },
  {
    id: '7',
    rank: 7,
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop',
    name: 'Smart Fitness Watch - Heart Rate Monitor',
    price: '$129.99',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    storeName: 'FitLife Tech',
    storeAvatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    storeFollowers: '189.7K',
    category: 'Wearables',
    commission: '20%',
    sales: 3654,
    conversionRate: '28.15%',
    revenue: '$475K',
    orders: '123K',
    totalRevenue: '$2.99M',
  },
  {
    id: '8',
    rank: 8,
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=200&fit=crop',
    name: 'Organic Green Tea Detox - 30 Day Supply',
    price: '$24.99',
    country: 'Japan',
    countryFlag: '🇯🇵',
    storeName: 'Zen Wellness',
    storeAvatar: 'https://images.unsplash.com/photo-1611329532992-0b7d198c5881?w=100&h=100&fit=crop',
    storeFollowers: '312.5K',
    category: 'Health Tea',
    commission: '22%',
    sales: 3421,
    conversionRate: '18.92%',
    revenue: '$85K',
    orders: '458K',
    totalRevenue: '$5.67M',
  },
  {
    id: '9',
    rank: 9,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=200&fit=crop',
    name: 'LED Strip Lights - RGB Color Changing 16ft',
    price: '$18.99',
    country: 'Canada',
    countryFlag: '🇨🇦',
    storeName: 'LightUp Home',
    storeAvatar: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=100&h=100&fit=crop',
    storeFollowers: '145.2K',
    category: 'Home Lighting',
    commission: '16%',
    sales: 3298,
    conversionRate: '52.34%',
    revenue: '$63K',
    orders: '789K',
    totalRevenue: '$4.23M',
  },
  {
    id: '10',
    rank: 10,
    image: 'https://images.unsplash.com/photo-1620799140188-3b2a7c2e0e12?w=200&h=200&fit=crop',
    name: 'Collagen Peptides Powder - Unflavored 20oz',
    price: '$39.99',
    country: 'United States',
    countryFlag: '🇺🇸',
    storeName: 'Vital Proteins',
    storeAvatar: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=100&h=100&fit=crop',
    storeFollowers: '523.8K',
    category: 'Protein Powder',
    commission: '24%',
    sales: 3087,
    conversionRate: '15.67%',
    revenue: '$123K',
    orders: '674K',
    totalRevenue: '$7.89M',
  },
  {
    id: '11',
    rank: 11,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop',
    name: 'Resistance Bands Set - 5 Level Fitness Bands',
    price: '$16.99',
    country: 'Australia',
    countryFlag: '🇦🇺',
    storeName: 'ActiveFit Gear',
    storeAvatar: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=100&h=100&fit=crop',
    storeFollowers: '98.6K',
    category: 'Fitness Equipment',
    commission: '19%',
    sales: 2956,
    conversionRate: '38.45%',
    revenue: '$50K',
    orders: '521K',
    totalRevenue: '$3.13M',
  },
  {
    id: '12',
    rank: 12,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=200&h=200&fit=crop',
    name: 'Aromatherapy Essential Oil Diffuser',
    price: '$28.99',
    country: 'France',
    countryFlag: '🇫🇷',
    storeName: 'Aroma Essence',
    storeAvatar: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=100&h=100&fit=crop',
    storeFollowers: '167.9K',
    category: 'Home Fragrance',
    commission: '21%',
    sales: 2823,
    conversionRate: '22.18%',
    revenue: '$82K',
    orders: '385K',
    totalRevenue: '$4.57M',
  },
  {
    id: '13',
    rank: 13,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784210?w=200&h=200&fit=crop',
    name: 'Portable Blender - USB Rechargeable Smoothie Maker',
    price: '$34.99',
    country: 'Germany',
    countryFlag: '🇩🇪',
    storeName: 'BlendJet Official',
    storeAvatar: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=100&h=100&fit=crop',
    storeFollowers: '234.1K',
    category: 'Kitchen Appliances',
    commission: '23%',
    sales: 2701,
    conversionRate: '31.56%',
    revenue: '$94K',
    orders: '432K',
    totalRevenue: '$5.24M',
  },
  {
    id: '14',
    rank: 14,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200&h=200&fit=crop',
    name: 'Silk Pillowcase - Anti-Aging Beauty Sleep',
    price: '$22.99',
    country: 'United States',
    countryFlag: '🇺🇸',
    storeName: 'LuxeSilk Home',
    storeAvatar: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=100&h=100&fit=crop',
    storeFollowers: '201.4K',
    category: 'Bedding',
    commission: '17%',
    sales: 2589,
    conversionRate: '41.23%',
    revenue: '$59K',
    orders: '617K',
    totalRevenue: '$3.99M',
  },
  {
    id: '15',
    rank: 15,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=200&h=200&fit=crop',
    name: 'Vitamin C Serum - Hyaluronic Acid Face Serum',
    price: '$19.99',
    country: 'South Korea',
    countryFlag: '🇰🇷',
    storeName: 'K-Beauty Lab',
    storeAvatar: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=100&h=100&fit=crop',
    storeFollowers: '445.7K',
    category: 'Skincare Serum',
    commission: '26%',
    sales: 2467,
    conversionRate: '19.84%',
    revenue: '$49K',
    orders: '893K',
    totalRevenue: '$6.78M',
  },
];

// 平台配置
const platforms = [
  { id: 'tiktok', name: 'TikTok', icon: TikTokIcon, activeColor: 'text-black border-black bg-gray-200' },
  { id: 'amazon', name: 'Amazon', icon: AmazonIcon, activeColor: 'text-orange-600 border-orange-600 bg-orange-50' },
  { id: 'shopify', name: 'Shopify', icon: ShopifyIcon, activeColor: 'text-green-600 border-green-600 bg-green-50' },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('tiktok');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ranking, setRanking] = useState('best-seller');

  const handleWatchTutorial = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  const getConversionRateColor = (rate: string) => {
    if (rate === '-') return 'text-gray-400';
    const numRate = parseFloat(rate);
    return numRate >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#F8F9FA] border-b border-gray-200 px-8 py-6 pb-0">
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <WatchTutorialButton onClick={handleWatchTutorial} />
          </div>
          <p className="text-md text-muted-foreground mt-1">
            Discover winning products across multiple platforms
          </p>
        </div>

        {/* Tabs */}
        <div>
          <div className="flex gap-0">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              const isActive = activeTab === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => setActiveTab(platform.id)}
                  className={`flex items-center gap-3 px-4 py-3 border-b-2 transition-all ${
                    isActive 
                      ? `${platform.activeColor} font-medium` 
                      : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon size={24} className="flex-shrink-0" />
                  <span>{platform.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white h-full p-6">
        <div className="flex gap-0">
          {/* Left Sidebar - Filters */}
          <div className="flex-shrink-0">
            <ProductsFilters />
          </div>

          {/* Right Content - Product Table */}
          <div className="flex-1 pl-6">
            {/* Search and Ranking Controls */}
            <div className="bg-white p-4 mb-4">
              <div className="flex items-center gap-4">
                {/* Search Box */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                {/* Ranking Select */}
                <div className="flex-shrink-0">
                  <Select value={ranking} onValueChange={setRanking}>
                    <SelectTrigger className="w-[180px] h-10">
                      <SelectValue placeholder="Select ranking" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="best-seller">Best Seller</SelectItem>
                      <SelectItem value="new-releases">New Releases</SelectItem>
                      <SelectItem value="fastest-growing">Fastest-Growing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[250px]">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
                    Store
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <span className="text-red-500">Sales</span>
                      <ChevronDown className="w-4 h-4 text-red-500" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <span>Conversion</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <span>Revenue</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <span>Total Orders</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <span>Total Revenue</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockProducts.filter(product => 
                  product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.storeName.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    {/* Rank */}
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm font-medium text-gray-900">
                        {product.rank}
                      </span>
                    </td>

                    {/* Product */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {product.name}
                          </div>
                          <div className="text-sm text-blue-600">
                            Price: {product.price}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Country */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{product.countryFlag}</span>
                        <span className="text-sm text-gray-900">
                          {product.country}
                        </span>
                      </div>
                    </td>

                    {/* Store */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={product.storeAvatar}
                          alt={product.storeName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.storeName}
                          </div>
                          <div className="text-xs text-gray-500">
                            Store Sales: {product.storeFollowers}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-900">
                        {product.category}
                      </span>
                    </td>

                    {/* Commission */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-900">
                        {product.commission}
                      </span>
                    </td>

                    {/* Sales */}
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {product.sales}
                      </span>
                    </td>

                    {/* Conversion Rate */}
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          'text-sm font-medium',
                          getConversionRateColor(product.conversionRate)
                        )}
                      >
                        {product.conversionRate}
                      </span>
                    </td>

                    {/* Revenue */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-900">
                        {product.revenue}
                      </span>
                    </td>

                    {/* Total Orders */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-900">
                        {product.orders}
                      </span>
                    </td>

                    {/* Total Revenue */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-900">
                        {product.totalRevenue}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeVideoModal}>
          <div className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video Player */}
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Products Tutorial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
