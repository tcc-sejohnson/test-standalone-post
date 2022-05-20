<script lang="ts">
	const getJson = async (shouldHaveBody: boolean) => {
		const resp = await fetch('/my-standalone-endpoint.json?which=json', {
			method: 'POST',
			body: shouldHaveBody ? '{}' : undefined
		});
		return (await resp.json()) as { name: string };
	};

	const getFormData = async (shouldHaveBody: boolean) => {
		const potentialBody = new FormData();

		const resp = await fetch('/my-standalone-endpoint.json?which=formData', {
			method: 'POST',
			body: shouldHaveBody ? potentialBody : undefined
		});
		return (await resp.json()) as { name: string };
	};

	let promise = Promise.resolve({ name: 'world' });
</script>

<button on:click={() => (promise = getJson(false))}>Get JSON with no body</button>
<button on:click={() => (promise = getJson(true))}>Get JSON with body</button>
<button on:click={() => (promise = getFormData(false))}>Get formData with no body</button>
<button on:click={() => (promise = getFormData(true))}>Get formData with body</button>

{#await promise}
	<p>Loading...</p>
{:then result}
	<p>{JSON.stringify(result)}</p>
{:catch error}
	<p>{JSON.stringify(error)}</p>
{/await}
