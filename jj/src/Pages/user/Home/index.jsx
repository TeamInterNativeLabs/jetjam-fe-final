import React from 'react'
import { UserLayout } from '../../../Components/Layout'
import { Banner } from './Banner'
import './index.css'
import AlbumRelease from './AlbumRelease/AlbumRelease'
import ShadowDivider from './Divider'
import FitMixMessage from './FitMixMessage'
import HomeVideo from './HomeVideo/HomeVideo'
import { TrendingDanceAndFitness } from './TrendingDanceAndFitness'
import JetJamsLiveStream from './JetJamsLiveStream'
import SubscriptionPlans from './SubscriptionPlans'
import SaturdayNiteParty from './SaturdayNiteParty'

export const Home = () => {
  return (
    <UserLayout>
      <Banner />
      <ShadowDivider />
      <AlbumRelease />
      <ShadowDivider />
      <FitMixMessage />
      <HomeVideo />
      <TrendingDanceAndFitness />
      <JetJamsLiveStream />
      <SubscriptionPlans />
      <SaturdayNiteParty />
    </UserLayout>
  )
}
