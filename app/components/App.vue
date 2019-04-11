<template>
    <Page>
        <ActionBar title="Welcome to radathina!" android:flat="true" />
        <TabView android:tabBackgroundColor="#53ba82" android:tabTextColor="#c4ffdf"
            android:selectedTabTextColor="#ffffff" androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Map">
                <GridLayout columns="*" rows="*">
                    <Map width="1000" height="1000" />
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Wetter">
                <GridLayout columns="*" rows="*">
                    <Wetter></Wetter>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Tab 3">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 3 Content" col="0" row="0" />
                </GridLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import Wetter from './Wetter'
    import Map from './Map'

    export default {
        data() {
            return {
                msg: 'Hello World!'
            }
        },
        components: {
            Wetter,
            Map
        }
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>